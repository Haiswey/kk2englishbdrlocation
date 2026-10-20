import {getTeachers} from '../../../lib/teachers';
export async function GET(){return Response.json({teachers:getTeachers()},{headers:{'Cache-Control':'no-store'}})}
