export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert("Link copied!");
  });
};

export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}