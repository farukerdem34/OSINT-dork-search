## 1. Proje Özeti ve Hedefler

**Amaç:** Mevcut HTML/CSS/JS web sitesinin, modern frontend teknolojileri kullanılarak yeniden mimarilendirilmesi ve "Linear / Modern" tasarım sistemiyle görsel olarak yeniden tasarlanması. **Hedef Kitle:** Geliştiriciler ve teknoloji odaklı kullanıcılar (Premium, teknik ve sinematik bir his hedeflenmektedir). **Temel Felsefe:** "Hassasiyet, Derinlik ve Akıcılık." Arayüz, statik bir sayfa gibi değil, 60 FPS çalışan yüksek kaliteli bir masaüstü uygulaması gibi hissettirmelidir.

---

## 2. Teknoloji Yığını (Tech Stack)

Aşağıdaki teknoloji setine sıkı sıkıya bağlı kalınacaktır:

- **Framework:** Next.js 14+ (App Router)
    
- **Dil:** TypeScript (Strict Mode)
    
- **Styling:** Tailwind CSS (v3.4+)
    
- **Animasyon:** Framer Motion (Mikro etkileşimler ve sayfa geçişleri için)
    
- **İkon Seti:** Lucide React (İnce strok, 16-20px boyutlarında)
    
- **Utility:** `clsx` ve `tailwind-merge` (Dinamik sınıflar için)
    
- **Font:** `Inter` veya `Geist Sans` (Değişken font teknolojisi ile)
    

---

## 3. Tasarım Sistemi Entegrasyonu (Implementation Strategy)

Tasarım sistemi, kod tabanına dağınık "magic number"lar olarak değil, merkezi bir konfigürasyon (Single Source of Truth) olarak entegre edilmelidir.

### A. Tailwind Konfigürasyonu (`tailwind.config.ts`)

Tasarım token'larını aşağıdaki gibi genişletin:

- **Renk Paleti (Colors):**
    
    - `bg-deep`: `#020203` (En dip katman)
        
    - `bg-base`: `#050506` (Ana zemin)
        
    - `bg-surface`: `rgba(255,255,255,0.05)` (Kartlar)
        
    - `accent`: `#5E6AD2` (Primary action)
        
    - `accent-glow`: `rgba(94,106,210,0.3)`
        
- **Tipografi (Typography):**
    
    - `h1`: `text-5xl font-semibold tracking-tight`
        
    - `label`: `text-xs font-mono tracking-widest uppercase text-white/40`
        
- **Gölgeler (Box Shadows):**
    
    - Tek katmanlı gölge yerine, tasarım sistemindeki "Multi-layer Shadow" formülünü `boxShadow` altına ekleyin.
        
- **Animasyonlar:**
    
    - `blob-float`: Arka plan ışık havuzlarının hareketi için keyframe'ler.
        

### B. Global CSS ve Katmanlar

- **Background System:** `body` etiketine tasarım sisteminde belirtilen 4 katmanlı yapıyı (Radial Gradient Base + Noise Texture + Animated Blobs + Grid Overlay) uygulayan bir bileşen (`<BackgroundLayout />`) oluşturun.
    

---

## 4. Bileşen Mimarisi (Component Architecture)

Atomik tasarıma sadık kalarak, yeniden kullanılabilir ve modüler bir yapı kurun.

### Temel Primitifler (UI Kit)

Bu bileşenler `components/ui` altında toplanmalı ve `cn()` (classnames) helper'ı ile stil override'ına izin vermelidir.

1. **`GlassCard`:**
    
    - `backdrop-blur`, ince beyaz border (`border-white/5`), ve hover durumunda parlayan `spotlight` efektini içeren kapsayıcı.
        
2. **`PrimaryButton`:**
    
    - `bg-accent`, iç gölge (inner-shadow), hover durumunda hafif scale (`1.02`) ve parlama efekti.
        
3. **`GradientText`:**
    
    - Başlıklar için `bg-clip-text` ve `text-transparent` kullanan, aşağıdan yukarıya şeffaflaşan özel başlık bileşeni.
        
4. **`Spotlight`:**
    
    - Mouse hareketini takip eden, elementlerin üzerinde gezdirildiğinde radyal bir ışık huzmesi oluşturan wrapper bileşen.
        

### Layout Primitifleri

1. **`BentoGrid`:**
    
    - Responsive, asimetrik grid yapısı (`md:grid-cols-3`). Hücrelerin birleşimi (`col-span-2`) ile dinamik düzenler sağlar.
        
2. **`Section`:**
    
    - Standart dikey boşluklar (`py-24` veya `py-32`) ve opsiyonel `border-t border-white/5` ayıraçları.
        

---

## 5. Uygulama Planı (Step-by-Step Plan)

Lütfen aşağıdaki sırayı takip et:

### Faz 1: Altyapı ve Token Kurulumu

1. Boş bir Next.js + TS projesi başlat.
    
2. `globals.css` içinde reset'leri yap ve arka plan için gerekli SVG noise pattern'i ekle.
    
3. `tailwind.config.ts` dosyasını tasarım sistemindeki tüm renk, font, gölge ve spacing değerleri ile doldur. **Bu adım en kritiğidir.**
    

### Faz 2: Temel UI Bileşenlerinin Kodlanması

1. **Button & Inputs:** Focus state'lerinde `ring-offset` ve `accent-glow` olduğundan emin ol.
    
2. **Card System:** Mouse-tracking spotlight efektini bir React Hook (`useMousePosition`) ile implemente et.
    
3. **Typography:** Başlıklar ve paragraflar için reusable bileşenler oluştur.
    

### Faz 3: Sayfa Yapılarının Oluşturulması

1. Mevcut HTML içeriğini analiz et ve anlamsal (semantic) olarak yeni bileşenlere taşı.
    
2. **Hero Section:** Scroll-linked parallax efektini (`useScroll` ve `useTransform` - Framer Motion) uygula. Başlık ve açıklama için "Staggered Fade-in" animasyonu ekle.
    
3. **Feature Grid:** Bento Grid yapısını kullanarak özellikleri yerleştir.
    

### Faz 4: "Juice" (Cila ve Mikro-Etkileşimler)

1. Sayfa yüklendiğinde arka plandaki "Gradient Blob"ların yavaşça süzülmesini sağla.
    
2. Tüm hover durumlarının `200ms` ve `expo-out` easing ile çalıştığını doğrula.
    
3. Lighthouse performans skorunu kontrol et (Gereksiz render'ları önle).
    

---

## 6. Kritik Gereksinimler (Constraints)

- **Dark Mode Only:** Tasarım sistemi sadece karanlık mod üzerine kuruludur. Light mode desteği eklemeye çalışma.
    
- **No "Flat" Colors:** Hiçbir yüzey `#000` veya düz renk olmamalıdır. Her zaman gradyan veya noise dokusu içermelidir.
    
- **Accessibility:** Renk kontrast oranlarına (özellikle gri metinlerde) dikkat et. Focus ring'ler klavye navigasyonu için görünür olmalıdır.
    
- **Responsiveness:** Mobil görünümde (`<768px`) Bento Grid tek kolona düşmeli, paddingler azalmalı (`py-16`) ve fontlar ölçeklenmelidir.
    

---

## 7. Örnek Kod Beklentisi (Snippet Example)

Bir bileşen yazarken şu standardı koru:

TypeScript

```
// components/ui/glowing-card.tsx
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowingCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8",
        "transition-colors duration-300 hover:border-white/10",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(94,106,210,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```