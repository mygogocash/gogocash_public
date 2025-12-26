# แนวทางการเขียน Commit Message

## รูปแบบพื้นฐาน

```
<type>(<scope>): <subject>

<body>

<footer>
```

## ประเภทของ Commit (Type)

- `feat`: เพิ่มฟีเจอร์ใหม่
- `fix`: แก้ไขบัก
- `docs`: แก้ไขเอกสาร
- `style`: การแก้ไขรูปแบบโค้ด (เช่น white-space, formatting, missing semi-colons)
- `refactor`: การปรับปรุงโค้ดที่ไม่ได้แก้บักหรือเพิ่มฟีเจอร์
- `perf`: การปรับปรุงประสิทธิภาพ
- `test`: เพิ่มหรือแก้ไขการทดสอบ
- `chore`: การเปลี่ยนแปลงอื่นๆ ที่ไม่เกี่ยวกับโค้ดหรือการทดสอบ

## ขอบเขต (Scope)

ขอบเขตเป็นส่วนที่ระบุว่าการเปลี่ยนแปลงนี้เกี่ยวข้องกับส่วนใดของโปรเจค เช่น:

- `auth`
- `api`
- `ui`
- `db`
- `config`

## หัวเรื่อง (Subject)

- ใช้ภาษาไทยหรืออังกฤษ (เลือกใช้ภาษาใดภาษาหนึ่งให้สม่ำเสมอ)
- ไม่ต้องมีจุดที่ท้ายประโยค
- ความยาวไม่เกิน 50 ตัวอักษร
- ขึ้นต้นด้วยคำกริยา (เช่น "เพิ่ม", "แก้ไข", "ลบ")

## เนื้อหา (Body)

- อธิบายรายละเอียดเพิ่มเติมว่าทำอะไร ทำไมต้องทำ
- แยกบรรทัดระหว่าง subject และ body ด้วยบรรทัดว่าง
- แต่ละบรรทัดไม่ควรเกิน 72 ตัวอักษร

## ส่วนท้าย (Footer)

ใช้สำหรับอ้างอิงถึง:

- Issue ที่เกี่ยวข้อง เช่น `Fixes #123`
- Breaking changes
- ผู้ร่วมงาน เช่น `Co-authored-by: name <name@example.com>`

## ตัวอย่าง

```
feat(auth): เพิ่มระบบ JWT authentication

- เพิ่ม JWT middleware สำหรับตรวจสอบ token
- เพิ่ม refresh token endpoint
- เพิ่มการเก็บ token ใน HttpOnly cookie

Fixes #123
```

```
fix(api): แก้ไขการส่งค่า response ผิดรูปแบบ

แก้ไขรูปแบบ response ให้ตรงตาม API specification
เดิมส่งค่าเป็น snake_case แต่ต้องเป็น camelCase

Breaking change: รูปแบบ response เปลี่ยนจาก snake_case เป็น camelCase
```
