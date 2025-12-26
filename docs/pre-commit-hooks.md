# Pre-commit Hooks

## การติดตั้ง

1. ติดตั้ง pre-commit:

```bash
brew install pre-commit
```

2. ติดตั้ง git hooks:

```bash
pre-commit install
```

## Hooks ที่ใช้งาน

### 1. pre-commit-hooks

```yaml
repo: https://github.com/pre-commit/pre-commit-hooks
rev: v4.5.0
```

#### Hooks ที่เปิดใช้งาน:

- `trailing-whitespace`: ลบช่องว่างท้ายบรรทัด
- `end-of-file-fixer`: ตรวจสอบและแก้ไขการจบไฟล์
- `check-yaml`: ตรวจสอบความถูกต้องของไฟล์ YAML
- `check-added-large-files`: ป้องกันการ commit ไฟล์ขนาดใหญ่
- `check-merge-conflict`: ตรวจสอบ merge conflicts ที่ยังไม่ได้แก้ไข
- `check-case-conflict`: ตรวจสอบความขัดแย้งของชื่อไฟล์ในระบบที่ไม่สนใจตัวพิมพ์เล็ก/ใหญ่

### 2. Black (Python Formatter)

```yaml
repo: https://github.com/psf/black
rev: 24.2.0
```

- จัดรูปแบบโค้ด Python ให้เป็นไปตามมาตรฐาน
- ใช้ Python 3

### 3. isort (Python Import Sorter)

```yaml
repo: https://github.com/pycqa/isort
rev: 5.13.2
```

- จัดเรียง imports ในไฟล์ Python
- ใช้ profile ของ black เพื่อความสอดคล้อง

### 4. Flake8 (Python Linter)

```yaml
repo: https://github.com/pycqa/flake8
rev: 7.0.0
```

- ตรวจสอบคุณภาพโค้ด Python
- มี plugin เพิ่มเติม: flake8-docstrings สำหรับตรวจสอบ docstrings

## การใช้งาน

### ทดสอบ Hooks กับไฟล์ทั้งหมด

```bash
pre-commit run --all-files
```

### ทดสอบ Hook เฉพาะตัว

```bash
pre-commit run <hook-id> --all-files
```

### ข้าม Hook

ในกรณีที่จำเป็น สามารถข้าม hook ได้โดยใช้ `--no-verify` ตอน commit:

```bash
git commit -m "message" --no-verify
```

## การแก้ไขปัญหา

1. ถ้า hook ไม่ทำงาน ลองรันคำสั่งต่อไปนี้:

```bash
pre-commit clean
pre-commit install
```

2. ถ้าต้องการอัพเดท hooks:

```bash
pre-commit autoupdate
```
