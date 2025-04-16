import { createClient } from "@shared/config/supabase/client";
import { ESupabaseBucket, ISupabaseFileData, TSupabaseFileObject } from "@shared/config/supabase/types";

const getUser = async (supabase: ReturnType<typeof createClient>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
};

export const getFileFromSupabase = async ({ filePath, bucket, hideUserPath }: ISupabaseFileData): Promise<Blob> => {
  const supabase = createClient();
  const user = await getUser(supabase);

  const path = hideUserPath ? filePath : `${user.id}/${filePath}`;

  const { data: fileBlob, error: downloadError } = await supabase.storage.from(bucket).download(path);

  if (downloadError) {
    throw new Error(`Failed to download file at ${path}: ${downloadError.message}`);
  }

  return fileBlob;
};

export const getFilesFromSupabase = async ({
  filePath,
  bucket,
  hideUserPath,
  options,
}: ISupabaseFileData): Promise<TSupabaseFileObject[]> => {
  const supabase = createClient();
  const user = await getUser(supabase);

  const path = hideUserPath ? filePath : `${user.id}/${filePath}`;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = "https://www.googleapis.com/auth/spreadsheets.readonly/";
  const fileId = "1tYWybvkLm1sJmOmcce__OfpuAkxkZc6V8H2V5SDyOSI";

  try {
    const response = await fetch(
      // "https://www.googleapis.com/drive/v3/files?
      // q=mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name)",
      `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/A1:Z`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.provider_token}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    console.log("Google Sheets List:", data);
  } catch (error) {
    console.error("Error fetching Google Sheets list:", error);
  }

  // .list('folder', {
  //   limit: 100,
  //   offset: 0,
  //   sortBy: { column: 'name', order: 'asc' },
  // })

  const { data, error: downloadError } = await supabase.storage.from(bucket).list(path, options);

  if (downloadError) {
    throw new Error(`Failed to download files at ${path}: ${downloadError.message}`);
  }

  return data;
};

export const deleteFileFromSupabase = async ({ filePath, bucket, hideUserPath }: ISupabaseFileData) => {
  const supabase = createClient();
  const user = await getUser(supabase);

  const path = hideUserPath ? filePath : `${user.id}/${filePath}`;

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`Failed to remove file at ${path}: ${error.message}`);
  }
};

export const uploadUrlToSupabase = async (fileUrl: string, filePath: string): Promise<string | null> => {
  try {
    const supabase = createClient();
    const user = await getUser(supabase);
    const id = user.id;

    const response = await fetch(fileUrl);
    const blob = await response.blob();

    const fullPath = `${id}/${filePath}`;

    const { data, error } = await supabase.storage
      .from(ESupabaseBucket.instagramMedia)
      .upload(fullPath, blob, { upsert: true });

    if (error) return null;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    return `${supabaseUrl}/storage/v1/object/public/${ESupabaseBucket.instagramMedia}/${id}/${filePath}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const uploadFileToSupabase = async (file: File, filePath: string): Promise<string | null> => {
  try {
    const supabase = createClient();
    const user = await getUser(supabase);
    const id = user.id;

    const fullPath = `${id}/${filePath}`;

    const { data, error } = await supabase.storage
      .from(ESupabaseBucket.instagramMedia)
      .upload(fullPath, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    return `${supabaseUrl}/storage/v1/object/public/${ESupabaseBucket.instagramMedia}/${fullPath}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
