export interface ISigninUserDto {
    usernameOrEmail: string;
    password: string;
}

export interface IUpdateUserDto {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phoneNumber: string | undefined;
    birthdate: string | undefined;
    country: string | undefined;
    province: string | undefined;
    city: string | undefined;
    zipCode: string | undefined;
}

export interface IChangePasswordDto {
    usernameOrEmail: string;
    oldPassword: string;
    newPassword: string;
    confirmedPassword: string;
}

export interface IDeleteAccountDto {
    usernameOrEmail: string;
    currentPassword: string;
    confirmedPassword: string;
}

export interface IUserViewModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    passwordHash: string;
    phoneNumber: string;
    birthdate: string;
    country: string;
    province: string;
    city: string;
    zipCode: string;
    type: number;
    lastModified: string;
    createdDate: string;
    isDeleted: boolean;
}

export interface IProductViewModel {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imagehref: string;
    lastModified: string;
    createdDate: string;
    isDeleted: boolean;
}

export interface IUserStoreState {
    loggedin: boolean;
    user: IUserViewModel | null;
}

export interface IDrawerStoreState {
    visible: boolean;
}

export interface IProduct {
    product: IProductViewModel;
    count: number;
    total: number;
}

export interface IShoppingCartState {
    productList: IProduct[];
    total: number;
}

export interface ResumeShoppingProduct {
    productId: number;
    productPrice: number;
    productName: string;
    productDescription: string;
    productImagehref: string;
    productCount: number;
    subtotal: number;
}