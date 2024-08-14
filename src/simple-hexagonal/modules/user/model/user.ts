// business model
export class User {
  constructor(
    readonly id: string,
    readonly firstname: string,
    readonly lastName: string,
    readonly email: string,
    readonly salt: string,
    readonly password: string,
    readonly role: string
  ) { };
}

export class UserRegistrationDTO {
  constructor(
    readonly firstname: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
  ) { };
}

export class UserLoginDTO {
  constructor(
    readonly email: string,
    readonly password: string,
  ) { };
}

export class UserUpdateDTO {
  constructor(
    readonly firstname?: string,
    readonly lastName?: string,
    readonly password?: string,
    readonly salt?: string
  ) { };
}

export class UserConditionDTO {
  constructor(
    readonly firstname?: string,
    readonly lastName?: string,
    readonly email?: string,
    readonly password?: string,
  ) { };
}