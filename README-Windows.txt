CardioDesk Desktop v1 — Tauri-ready prototype

Що це:
- Та сама клінічна база CardioDesk v14.
- Окреме широкоформатне компонування для ПК від 1100 px.
- Постійна ліва навігація на головній.
- Категорії у 2–3 колонки, праворуч Обране/Недавні.
- Калькулятори відкриваються в центральній робочій області.
- Ctrl+K — пошук.
- Alt+← — назад.
- Ctrl+P — клінічний звіт поточного калькулятора.
- Мобільна версія не змінена: desktop CSS активується лише на широкому екрані.

Як запустити як Windows-програму (після встановлення Tauri prerequisites):
1. Встановити Microsoft C++ Build Tools + WebView2 Runtime (на Windows 10/11 зазвичай WebView2 вже є).
2. Встановити Rust: https://rustup.rs
3. Відкрити PowerShell у цій папці.
4. npm install
5. npm run desktop

Збірка .exe / .msi:
   npm run build:desktop

Інсталятор буде у src-tauri\\target\\release\\bundle\\

Примітка:
Цей ZIP містить source-ready desktop prototype. Він не є вже скомпільованим .exe, бо збірка Windows/Tauri потребує Rust + Windows build toolchain.
