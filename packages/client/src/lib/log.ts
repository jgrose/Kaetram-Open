class Logger {
    public constructor(public level: 'debug' | 'info') {}

    public info(...data: unknown[]): void {
        if (this.level === 'debug' || this.level === 'info') console.info(...data);
    }

    public debug(...data: unknown[]): void {
        if (this.level === 'debug') console.log(...data);
    }

    public error(...data: unknown[]): void {
        console.error(...data);
    }
}

export default new Logger('debug');
