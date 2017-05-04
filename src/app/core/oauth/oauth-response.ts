export class OAuthResponse {
    private access_token: string;
    private token_type: string;
    private refresh_token: string;
    private expires_in: number;
    private scope: string;

    constructor(object: any) {
        this.access_token = object['access_token'];
        this.token_type = object['token_type'];
        this.refresh_token = object['refresh_token'];
        this.expires_in = object['expires_in'];
        this.scope = object['scope'];
    }

    public getAccessToken(): string {
        return this.access_token;
    }

    public getTokenType(): string {
        return this.token_type;
    }

    public getRefreshToken(): string {
        return this.refresh_token;
    }

    public getExpiresIn(): number {
        return this.expires_in;
    }

    public getScope(): string {
        return this.scope;
    }
}
