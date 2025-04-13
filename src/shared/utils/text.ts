export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert("Link copied!");
  });
};
