import request from "request";

export async function cfapi(url: string) {
  return new Promise<any>((resolve, reject) => {
    request(url, { json: true }, (err, _, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
}
