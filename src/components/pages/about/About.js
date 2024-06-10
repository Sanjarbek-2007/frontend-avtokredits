import React from 'react';
import './About.css'; // Assuming you have a CSS file for styling

const About = () => {


    return (
        <div id="aboutPopup" className="container">
            {/*<span className="close" onClick={closeAboutPopup}>&times;</span>*/}
            <h1>Avtokreditlar Haqida</h1>
            <p>Avtokreditlar - mijozlarga avtokreditlarni taqdim etuvchi etakchi moliyaviy xizmat. Bizning vazifamiz - avtokreditlarni hammasi uchun qulay va mukammal qilish. Biz raqobatbardosh foiz stavkalar, to'lov rejalari va mijozlarga ajoyib xizmat ko'rsatish orqali sizga avtomobilingizni moliyalashda eng yaxshi tajribani ta'minlash.</p>

            <h2>Bizning xizmatlarimiz</h2>
            <p>Biz mijozlarimizning turli talablari uchun moslashtirilgan keng qamrovli xizmatlarni taklif etamiz, shu jumladan:</p>
            <ul>
                <li>Yangi avtomobillar uchun kreditlar</li>
                <li>Ishlatilgan avtomobillar uchun kreditlar</li>
                <li>Kreditni qayta moliyalash variantlari</li>
                <li>Kreditning oldindan isbotlangan ma'lumotlari</li>
            </ul>

            <h2>Nega bizni tanlashlar?</h2>
            <p>Avtokreditlarni tanlaganingizda, quyidagi afzalliklarni olasiz:</p>
            <ul>
                <li>Qulay foiz stavkalar</li>
                <li>Kredit shartlari</li>
                <li>Tez ko'rib chiqish jarayoni</li>
                <li>Professional moliyaviy maslahatlar</li>
                <li>Mijozlar uchun ajoyib qo'llab-quvvatlash</li>
            </ul>

            <h2>Biz bilan bog'lanish</h2>
            <p>Agar savollaringiz bo'lsa yoki qo'llab-quvvat kerak bo'lsa, iltimos, bizga murojaat qiling:</p>
            <p>Telefon: +998 99 819 21 41</p>
            <p>Manzil: Chilonzor metro</p>
        </div>
    );
}

export default About;
