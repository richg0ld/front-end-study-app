'use strict';

//dev서버
export let SERVER_URL: string = 'http://127.0.0.1:3000';
//build서버
// export let SERVER_URL: string = '';
export let isTeacher: boolean;
export let myIp: string;
export const checkTeacher = (boolean: boolean) => isTeacher = boolean;
export let getMyIp = (ip: string) => myIp = ip;


