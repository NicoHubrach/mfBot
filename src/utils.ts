
import * as https from "node:https";

export const between = (min: number, max: number): number => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

export const makeRequest = (options: string | https.RequestOptions | URL, process: (response: any[]) => void, fallback: (err: Error) => void) => {
    https.get(options, res => {

        let data: any[] = [];

        res.on('data', chunk => {
            data.push(chunk);
        });

        return res.on('end', () => {
            try {
                process(JSON.parse(Buffer.concat(data).toString()))
            } catch (e) {
                fallback(e as Error);
            }
        });

    }).on('error', fallback);
}
