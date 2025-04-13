import React from "react";

import CheckoutContents from "@entities/Subscription/components/checkout/checkout-contents";

import { createClient } from "@shared/config/supabase/server";

interface Props {
  params: { priceId: string };
}
const Page: React.FC<Props> = async ({ params }) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return <CheckoutContents userEmail={data.user?.email} priceId={params.priceId} />;
};

export default Page;
