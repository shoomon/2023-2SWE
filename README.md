### Python 백엔드 서버 세팅 및 실행

- Python이 설치되어 있는 상태에서 진행
- 서버 세팅이 다 되어있는 상태에서는 1, 3, 5번만 실행

<br />

1. Python 백엔드 디렉토리로 이동

   ```shell
   cd backend
   ```

2. Python 가상 환경 세팅

   ```shell
   python -m venv .venv
   ```

3. 가상 환경 접속 (맥북)

   ```shell
   source .venv/bin/activate
   ```

4. 의존성 설치

   ```shell
   pip install -r requirements.txt
   ```

5. 백엔드 서버 실행

   ```shell
   uvicorn main:app --reload
   ```

6. 개발 후, 작업 환경 종료 시 실행

   ```shell
   deactivate
   ```

<br />

---

<br />

### React 프론트엔드 서버 세팅 및 실행

- Node.js가 설치되어 있는 상태에서 진행

<br />

1. React 프론트엔드 디렉토리로 이동

   ```shell
   cd frontend
   ```

2. pnpm 설치 (pnpm이 깔려있지 않은 경우)

   ```shell
   npm install -g pnpm
   ```

3. 의존성 설치 (pnpm이 깔려있지 않은 경우에는 pnpm부터 설치)

   ```shell
   pnpm install
   ```

4. 프론트엔드 서버 실행

   ```shell
   pnpm dev
   ```
