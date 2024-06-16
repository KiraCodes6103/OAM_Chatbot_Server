import { PdfReader } from "pdfreader";

export const getContext = (filePath) => {
  return new Promise((resolve, reject) => {
    let context = "";
    // let arr = [];
    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        console.error("error:", err);
        reject(err);
      } else if (!item) {
        console.warn("end of file");
        resolve(context);
      } else if (item.text) {
        let paragraph = item.text
          .trim()
          .replace(/[^a-zA-Z\s\n\t]+/g, " ")
          .replace(/\s+/g, " ")
          .replace(/\n\s*\n/g, " ")
          .trim();
          // console.log("para => " + paragraph);
        context += paragraph + " ";
        
      }
    });
  });
};
