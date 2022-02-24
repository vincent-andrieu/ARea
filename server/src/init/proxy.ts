import { env } from "process";
import { ChildProcess, exec, ExecException } from "child_process";

export default class ProxySSL {
    private _childProcess: ChildProcess;
    private _manualClose = false;

    constructor(onTerminate?: () => void, onError?: (err: ExecException) => void) {
        this._childProcess = exec(`local-ssl-proxy --source ${env.SERVER_PROXY_PORT} --target ${env.SERVER_PORT}`,
            (err) => {
                if (err && onError && !this._manualClose)
                    return onError(err);
                if (onTerminate)
                    onTerminate();
            });

        this._childProcess.stdout?.on("data", (data) => console.log("[ProxySSL]:", data));
        this._childProcess.stderr?.on("data", (data) => console.error("[ProxySSL]:", data));

        console.info("ProxySSL PID:", this._childProcess.pid);
    }

    public kill(): void {
        this._manualClose = true;
        if (!this._childProcess.kill())
            throw "Fail to kill ProxySSL";
    }

}