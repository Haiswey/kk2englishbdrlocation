export function getTeachers():string[]{return (process.env.TEACHER_NAMES||'').split('|').map(name=>name.trim()).filter(Boolean);}
