interface Code {
    code: string;
    uid?: string | null
    
}

interface School {
    name: string;
    codes: Code[]
    
}

export class Configuration {
    name: string = 'gil'
}
