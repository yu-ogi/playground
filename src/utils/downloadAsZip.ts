import * as path from "path";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { PseudoFile } from "~/types/PseudoFile";
import { getBinaryContent } from "~/utils/getBinaryContent";

const binaryCache: { [name: string]: any } = {};

export async function downloadAsZip(name: string, pseudoFiles: PseudoFile[]) {
	const zip = new JSZip();

	for (const file of pseudoFiles) {
		if (file.assetType === "game.json") {
			zip.file(file.filename, file.value);
		} else if (file.assetType === "script" || file.assetType === "text") {
			const dir = zip.folder(path.dirname(file.path));
			if (!dir) continue;
			dir.file(file.filename, file.value);
		} else if (file.assetType === "image") {
			const dir = zip.folder(path.dirname(file.path));
			if (!dir) continue;
			dir.file(file.filename, file.blob, { binary: true });
		} else if (file.assetType === "audio") {
			try {
				const dir = zip.folder(path.dirname(file.path));
				if (!dir) continue;
				const oggFilename = file.filename + ".ogg";
				const aacFilename = file.filename + ".aac";
				if (!binaryCache[oggFilename]) {
					binaryCache[oggFilename] = await getBinaryContent(file.uri + ".ogg");
				}
				if (!binaryCache[aacFilename]) {
					binaryCache[aacFilename] = await getBinaryContent(file.uri + ".aac");
				}
				if (binaryCache[oggFilename]) {
					dir.file(oggFilename, binaryCache[oggFilename], { binary: true });
				}
				if (binaryCache[aacFilename]) {
					dir.file(aacFilename, binaryCache[aacFilename], { binary: true });
				}
			} catch (e) {
				console.error(e);
			}
		}
	}

	const content = await zip.generateAsync({ type: "blob" });
	saveAs(content, name);
}
