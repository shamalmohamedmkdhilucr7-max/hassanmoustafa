import cv2
import os

video_path = 'public/assets/video/hero.mp4'
out_dir = 'public/assets/hero-sequence'
os.makedirs(out_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
count = 1

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # resize to 720p to keep it performant for scroll
    frame = cv2.resize(frame, (1280, 720))
    cv2.imwrite(f"{out_dir}/{count:04d}.jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 60])
    if count % 50 == 0:
        print(f"Extracted {count} frames...")
    count += 1
    
cap.release()
print(f"Done. Extracted {count-1} frames.")
