import {GoogleGenerativeAI} from "@google/generative-ai";
import {apiKey} from "../constants/apiKey";

const genAI = new GoogleGenerativeAI(apiKey);

export async function extractDataFromImage(file: File): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const imageData: any = await fileToGenerativePart(file);

    const prompt = `Extract invoice data from this image. Return a JSON object with the following structure:
    {
      "invoice": {
        "serialNumber": string,
        "customerName": string,
        "productName": string,
        "quantity": number,
        "tax": number,
        "totalAmount": number,
        "date": string
      },
      "product": {
        "name": string,
        "quantity": number,
        "unitPrice": number,
        "tax": number,
        "priceWithTax": number
      },
      "customer": {
        "name": string,
        "phoneNumber": string,
        "totalPurchaseAmount": number
      }
    }`;

    const result = await model.generateContent([prompt, imageData]);

    const response = result.response;
    const text = response.text();
    const jsonString = text.replace(/^```json\n|```$/g, "");

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error extracting data from image:", error);
    throw error;
  }
}

export async function extractDataFromPDF(file: File): Promise<any> {
  return extractDataFromImage(file);
}

export async function extractDataFromExcel(file: File): Promise<any> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        invoice: {
          serialNumber: "EX" + Math.random().toString(36).substr(2, 9),
          customerName: "Excel Customer",
          productName: "Excel Product",
          quantity: 1,
          tax: 10,
          totalAmount: 100,
          date: new Date().toISOString(),
        },
        product: {
          name: "Excel Product",
          quantity: 1,
          unitPrice: 90,
          tax: 10,
          priceWithTax: 100,
        },
        customer: {
          name: "Excel Customer",
          phoneNumber: "1234567890",
          totalPurchaseAmount: 100,
        },
      });
    };
    reader.readAsArrayBuffer(file);
  });
}

async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result?.toString().split(",")[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {data: await base64EncodedDataPromise, mimeType: file.type},
  };
}
