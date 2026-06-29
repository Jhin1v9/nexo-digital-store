import { writeFileSync } from "fs";
import { mockApps } from "@/lib/mock-data";

const data = JSON.stringify(mockApps, null, 2);
writeFileSync("src/data/apps.json", data);
console.log(`Exported ${mockApps.length} apps to src/data/apps.json`);
