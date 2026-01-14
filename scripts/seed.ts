
import { createClient } from '@supabase/supabase-js';
import { fakerZH_CN as faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import path from 'path';

// 加载 .env.local 环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 错误: 未找到 Supabase 环境变量，请检查 .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🌱 开始生成测试数据...');
  
  const data = Array.from({ length: 50 }).map(() => ({
    nickname: faker.person.firstName().slice(0, 20), // 限制 20 字符
    content: faker.lorem.sentence(3).slice(0, 50),   // 限制 50 字符
    created_at: faker.date.recent({ days: 30 }).toISOString(), // 最近 30 天
  }));

  const { error, count } = await supabase
    .from('guestbook')
    .insert(data)
    .select('*', { count: 'exact' });

  if (error) {
    console.error('❌ 插入数据失败:', error.message);
  } else {
    console.log(`✅ 成功插入 ${data.length} 条数据！`);
  }
}

seed();
