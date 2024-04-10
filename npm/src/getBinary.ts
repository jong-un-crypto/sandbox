import { Binary } from ".";
import { join } from "path";
import * as os from "os";

function getPlatform() {
  const type = os.type();
  const arch = os.arch();

  if ((type === "Linux" || type === "Darwin") && arch === "x64") {
    return [type, "x86_64"];
  } else if (type === "Darwin" && arch === "arm64") {
    return [type, "arm64"];
  }

  throw new Error(`Unsupported platform: ${type} ${arch}`);
}

export function CloudFlareUrl(): string {
  const [platform, arch] = getPlatform();
  return `https://unc-s3.jongun2038.win/${platform}-${arch}/0.7.2/6e7f0ea83cee07c24683f2b8196abb2717d47532/uncd-sandbox.tar.gz`;
}

export function getBinary(name: string = "uncd-sandbox"): Promise<Binary> {
  if (!process.env["UNC_SANDBOX_BIN_PATH"]) {
    process.env["UNC_SANDBOX_BINARY_PATH"] = join(
      os.homedir(),
      ".UNC",
      "sandbox"
    );
  }

  // Will use version after publishing to AWS
  // const version = require("./package.json").version;
  const fromEnv = process.env["SANDBOX_ARTIFACT_URL"];
  const urls = [CloudFlareUrl()];
  if (fromEnv) {
    urls.unshift(fromEnv);
  }

  return Binary.create(name, urls);
}
