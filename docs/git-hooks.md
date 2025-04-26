# Git Hooks

เอกสารนี้จะอธิบายเกี่ยวกับ Git Hooks ที่ถูกตั้งค่าไว้ในโปรเจค

## Pre-commit Hook

Pre-commit hook จะทำงานก่อนที่จะทำการ commit code โดยจะทำการตรวจสอบดังนี้:

1. **Format Code**

   - ใช้ Prettier ในการ format code ให้สวยงามและเป็นมาตรฐานเดียวกัน
   - คำสั่ง: `npm run format`

2. **Lint Check**

   - ตรวจสอบ code style และ potential errors
   - คำสั่ง: `npm run lint`

3. **Type Check**

   - ตรวจสอบ type errors (สำหรับ TypeScript)
   - คำสั่ง: `npm run type-check`

4. **Auto-add Formatted Files**
   - เพิ่มไฟล์ที่ถูก format แล้วเข้าไปใน commit อัตโนมัติ

## Pre-push Hook

Pre-push hook จะทำงานก่อนที่จะทำการ push code ไปยัง remote repository โดยจะทำการตรวจสอบดังนี้:

1. **Run Tests**

   - รัน test cases ทั้งหมด
   - คำสั่ง: `npm run test`

2. **Build Project**

   - build โปรเจคเพื่อตรวจสอบว่าสามารถ build ได้สำเร็จ
   - คำสั่ง: `npm run build`

3. **Prevent Push on Failure**
   - ถ้ามีข้อผิดพลาดในขั้นตอนใดๆ จะไม่อนุญาตให้ push code
   - แสดงข้อความแจ้งเตือนให้แก้ไขปัญหาก่อน push

## การใช้งาน

Git Hooks จะทำงานอัตโนมัติเมื่อคุณทำการ commit หรือ push code ไม่จำเป็นต้องทำอะไรเพิ่มเติม

### ข้อควรระวัง

1. ตรวจสอบให้แน่ใจว่าได้ติดตั้ง dependencies ทั้งหมดแล้ว
2. ถ้าไม่ต้องการให้ hook ทำงาน สามารถใช้คำสั่ง `git commit --no-verify` หรือ `git push --no-verify`
3. ควรแก้ไขปัญหาทั้งหมดที่พบก่อนทำการ commit หรือ push
