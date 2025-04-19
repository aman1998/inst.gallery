import React from "react";
import { Modal, Button, Form, Upload, Image, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { RcFile } from "antd/lib/upload";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UploadFile } from "antd/es/upload/interface";
import imageCompression from "browser-image-compression";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector } from "@entities/Project/model/selectors";

import { uuidv4 } from "@shared/utils/uuid";
import { TNullable } from "@shared/types/common";
import { useMessage } from "@shared/hooks/useMessage";
import { createClient } from "@shared/config/supabase/client";
import { ESupabaseBucket } from "@shared/config/supabase/types";
import { useUserInfo } from "@shared/providers/UserProvider/lib/useUserInfo";

const schema = z.object({
  image: z.any(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  defaultUrl?: TNullable<string>;
  onChange?: (fileUrl: TNullable<string>) => void;
  maxWidthOrHeight?: number;
  maxSizeMB?: number;
};

const UploadAvatar: React.FC<Props> = ({
  defaultUrl,
  onChange: onChangeProp,
  maxWidthOrHeight = 500,
  maxSizeMB = 1,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<TNullable<UploadFile>>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const { errorMessage, successMessage, infoMessage, loadingMessage, destroyMessage } = useMessage();
  const project = useProjectStore(projectSelector);
  const { user } = useUserInfo();
  const { isDemo } = useLKLayout();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<FormData>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    if (defaultUrl) {
      const defaultFile: UploadFile = {
        uid: "-1",
        name: "default-image",
        status: "done",
        url: defaultUrl,
      };
      setFile(defaultFile);
      setPreviewUrl(defaultUrl);
      setValue("image", defaultFile); // для валидации
    }
  }, [defaultUrl, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (loading) return;

      if (!data.image) {
        onChangeProp?.(null);
        return;
      }

      if (isDemo) {
        onChangeProp?.(previewUrl);
        return;
      }

      setLoading(true);
      const supabase = createClient();

      const file = data?.image?.originFileObj || data?.image;
      const compressedFile = await imageCompression(file, {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
      });

      const filePath = "avatar.jpg";
      const fullPath = `${user?.id}/${project?.id}/${filePath}`;

      const { error } = await supabase.storage
        .from(ESupabaseBucket.projectAvatar)
        .upload(fullPath, compressedFile, { upsert: true });

      if (error) {
        errorMessage(`Failed to upload avatar to Supabase: ${error.message}`);
        return;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const avatarUrl = `${supabaseUrl}/storage/v1/object/public/${ESupabaseBucket.projectAvatar}/${fullPath}?t=${Date.now()}`;

      onChangeProp?.(avatarUrl);
      successMessage("Success uploaded!");
    } catch (e: any) {
      if (e?.message) {
        errorMessage(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBeforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image!");
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      errorMessage(`${file.name} is too large. Maximum size is 5MB.`);
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setFile({
      uid: uuidv4(),
      name: file.name,
      status: "done",
      url: URL.createObjectURL(file),
      originFileObj: file as RcFile,
    });

    return true;
  };

  return (
    <Form className="antd-upload-avatar" layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Image file" validateStatus={errors.image ? "error" : ""} help={errors.image?.message as string}>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <Upload
              listType="picture-card"
              fileList={file ? [file] : []}
              beforeUpload={(file) => {
                const result = handleBeforeUpload(file);
                if (result !== false) {
                  field.onChange({ target: { value: file } });
                } else {
                  field.onChange(null);
                }
                return false;
              }}
              onRemove={() => {
                setFile(null);
                setPreviewUrl(null);
                field.onChange(null);
              }}
            >
              <Typography.Text style={{ fontSize: 14 }}>Max (10mb)</Typography.Text>
            </Upload>
          )}
        />
      </Form.Item>

      {previewUrl && (
        <Form.Item label="Preview">
          <Image src={previewUrl} alt="Preview" width={200} height={200} style={{ objectFit: "cover" }} />
        </Form.Item>
      )}

      <Form.Item>
        <Button iconPosition="end" disabled={!isValid || !isDirty} loading={loading} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadAvatar;
