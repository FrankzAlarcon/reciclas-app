/* eslint-disable no-use-before-define */
// Api de prueba
export interface Data {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

// Navigation
export type RootStackParamList = {
    LoginPage_CollectionCenter: undefined;
    SignupPage_CollectionCenter: undefined;
    HomePage_CollectionCenter: undefined;
    ReceptionPage_CollectionCenter: undefined;
    Menu_CollectionCenter: undefined;
    UserIdentification_CollectionCenter: undefined;
};

// General
export interface Error {
    statusCode: number;
    error: string;
    message: string;
}

// Center Employee Login
export interface CenterEmployeeLogin {
    error: Error;
    body: CenterEmployeeLoginBody;
}

export interface CenterEmployeeLoginBody {
    role: string;
    user: CenterEmployeeBody;
    collectCenter: CollectionCenterBody;
    total: number;
}

// User
export interface UserBody {
    email: string;
    ci: string;
    name: string;
    lastName: string;
    phone: string;
    status: string;
    province: string;
    city: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    error: Error;
    body: UserBody;
}

// Collection Center
export interface CollectionCenterBody {
    id: number;
    name: string;
    hash: string;
    address: string;
    lat: string;
    lng: string;
    createdAt: string;
    updatedAt: string;
    locationId: number;
    managerEmail: string;
}

export interface CollectionCenter {
    error: Error;
    body: CollectionCenterBody;
}

export interface CollectionCenters {
    error: Error;
    body: CollectionCenterBody[];
}

export interface RecolectionCollectionCenter {
    error: Error;
    body: RecolectionCollectionCenterBody;
}

export interface RecolectionCollectionCenterBody {
    collectCenter: CollectionCenterBody;
    total: number;
}

// Center employee
export interface CenterEmployeeBody {
    email: string;
    name: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    collectCenterId: number;
}

export interface CenterEmployee {
    error: Error;
    body: CenterEmployeeBody;
}

// Graphql News
export interface NewsData {
    data: Datos;
    extensions: Extensions;
}

export interface Datos {
    eventos: Eventos;
}

export interface Eventos {
    edges: Edge[];
}

export interface Edge {
    node: EdgeNode;
}

export interface EdgeNode {
    id: string;
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    imagen: Imagen;
    horaInicio: string;
    horaFin: string,
    modalidad: string;
    lugar: string;
    author: Author;
}

export interface Author {
    node: AuthorNode;
}

export interface AuthorNode {
    name: string;
}

export interface Imagen {
    node: ImagenNode;
}

export interface ImagenNode {
    mediaItemUrl: string;
}

export interface Extensions {
    debug: Debug[];
}

export interface Debug {
    type: string;
    message: string;
}
