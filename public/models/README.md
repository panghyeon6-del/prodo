# 3D 모델 넣는 곳

1. 이 폴더에 모델 파일을 넣는다 — `frodo.glb` (권장) 또는 `frodo.fbx`
   - FBX 텍스처(png 등)는 같은 폴더에 함께 넣는다
2. `src/lib/site.ts` 의 `HERO` 를 `{ mode: '3d', model: 'models/frodo.glb' }` 로 바꾼다
3. 고치기 전에 미리보기: 개발 서버에서 `/?3d=models/frodo.glb`

크기·위치는 자동으로 맞춰지고, 애니메이션이 있으면 첫 클립이 반복 재생된다.
가볍게: Blender → glTF Binary(.glb) 내보내기, 텍스처 1024~2048px, 가능하면 5MB 이하.
