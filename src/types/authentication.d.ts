
export interface ClientRequest {
    grantType: string;
    id: string;
    secret: string;
}

export interface ClientResponse {
    token: string;
}
