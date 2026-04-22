# 🧠 Task Management Case

## 🇹🇷 Proje Açıklaması

Bu proje, teknik değerlendirme kapsamında geliştirilmiş basit bir görev yönetim uygulamasıdır.  
Backend tarafında **Laravel (API)**, frontend tarafında **Next.js + TypeScript + Tailwind CSS** kullanılmıştır.

---

## ⚙️ Özellikler

### 📌 Görevler (Tasks)
- Görev listeleme
- Görev oluşturma
- Görev güncelleme
- Görev silme
- Arama (title & description)
- Status ve priority filtreleme
- Kategoriye göre filtreleme
- Sayfalama (pagination)

### 🗂️ Kategoriler (Categories)
- Hiyerarşik kategori yapısı (parent_id)
- Sınırsız derinlik desteği
- Tree (ağaç) görünümü
- Kategori CRUD işlemleri

### 🔗 Önemli Özellik
Bir kategori seçildiğinde:
- O kategoriye ait görevler
- Ve tüm alt kategorilere ait görevler birlikte listelenir  
(**descendant category task listing**)

---

## 🧠 Teknik Kararlar

### Kategori Yapısı
Kategoriler self-referencing (`parent_id`) yapısıyla modellenmiştir.  
Bu sayede sınırsız derinlikte hiyerarşi desteklenmektedir.

### Kategori Silme Stratejisi
Bir kategori şu durumlarda silinemez:
- Alt kategorisi varsa
- İçinde görev varsa

Bu yaklaşım veri bütünlüğünü korumak için tercih edilmiştir.

### Filtreleme & Arama
Tüm filtreleme işlemleri backend tarafında query parametreleri ile yapılmaktadır.

### Mimari
- Laravel API yapısı
- FormRequest ile validation
- Component bazlı frontend yapı
- Basit ve sürdürülebilir state yönetimi

---

## 🚀 Kurulum

### 🔧 Backend (Laravel)

```bash
cd backend
php C:\xampp\php\composer install
php artisan migrate:fresh --seed
php artisan serve
