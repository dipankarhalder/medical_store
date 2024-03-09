// authentication
export const REGISTER = '/v1/auth/signup';
export const LOGIN = '/v1/auth/signin';
export const LOGOUT = '/v1/auth/logout';

// users
export const LISTUSERS = '/v1/users/userlist';
export const VIEWUSER = '/v1/user/:userid';
export const UPDATEUSER = '/v1/user/:userid';
export const DELETEUSER = '/v1/user/:userid';

// slots
export const CREATESLOT = '/v1/slot';
export const LISTSLOTS = '/v1/slots';
export const VIEWSLOT = '/v1/slot/:slotid';
export const UPDATESLOT = '/v1/slot/:slotid';
export const DELETESLOT = '/v1/slot/:slotid';

// medicine
export const CREATEMED = '/v1/med';
export const LISTMEDS = '/v1/meds';
export const VIEWMED = '/v1/med/:medid';
export const UPDATEMED = '/v1/med/:medid';
export const DELETEMED = '/v1/med/:medid';
