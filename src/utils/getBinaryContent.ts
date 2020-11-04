const JSZipUtils = require("jszip-utils");

export function getBinaryContent(url: string) {
	return new Promise<ArrayBuffer>((resolve, reject) => {
		JSZipUtils.getBinaryContent(url, function (err: any, data: ArrayBuffer) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}
