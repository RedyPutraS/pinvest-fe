import React, { useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';

const ActivityTrackerWithPopup: React.FC = () => {
    const cookieName = 'user_activity';
    const cookieRejectTime = 'cookie_reject_time'; // Nama cookie untuk menyimpan waktu penolakan
    const maxActivities = 5; // Jumlah maksimum aktivitas yang disimpan
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [activities, setActivities] = useState<string[]>([]);

    // Fungsi untuk menyimpan riwayat aktivitas
    const saveActivity = (activity: string) => {
        const existingActivities = getActivitiesFromCookies() || [];
        existingActivities.push(activity);

        // Batasi jumlah aktivitas
        if (existingActivities.length > maxActivities) {
            existingActivities.shift(); // Hapus aktivitas paling lama
        }

        // Simpan kembali ke cookie
        setCookie(null, cookieName, JSON.stringify(existingActivities), {
            maxAge: 60 * 60 * 24, // 1 hari
            path: '/',
        });
    };

    // Fungsi untuk mengambil riwayat aktivitas dari cookies
    const getActivitiesFromCookies = (): string[] | null => {
        const cookies = parseCookies();
        if (cookies[cookieName]) {
            return JSON.parse(cookies[cookieName]);
        }
        return null;
    };

    // Fungsi untuk menangani konfirmasi dari pop-up
    const handleConfirm = () => {
        const currentPage = window.location.href; // URL halaman saat ini
        saveActivity(`Visited ${currentPage}`);
        setShowPopup(false); // Menyembunyikan pop-up
    };

    const handleCancel = () => {
        // Simpan waktu penolakan cookie
        const currentTime = new Date().getTime();
        setCookie(null, cookieRejectTime, currentTime.toString(), {
            maxAge: 60 * 60 * 24, // 1 hari
            path: '/',
        });
        setShowPopup(false); // Menyembunyikan pop-up
    };

    // Mengambil aktivitas saat komponen dimuat
    useEffect(() => {
        const savedActivities = getActivitiesFromCookies();
        setActivities(savedActivities || []);

        // Cek apakah user_activity sudah ada
        if (!savedActivities) {
            setShowPopup(true); // Tampilkan pop-up jika tidak ada di cookies
        }
    }, []);

    // Menampilkan pop-up setiap menit jika belum diset ke false
    useEffect(() => {
        const checkPopupInterval = setInterval(() => {
            const cookies = parseCookies();
            const rejectTime = cookies[cookieRejectTime];
            

            // Cek apakah waktu penolakan sudah lebih dari 1 menit
            if (!cookies[cookieName]) {
                if (rejectTime) {
                    const currentTime = new Date().getTime();
                    const timeElapsed = currentTime - parseInt(rejectTime);
                    
                    if (timeElapsed >= 60 * 1000) { // Jika lebih dari 1 menit
                        setShowPopup(true); // Tampilkan pop-up lagi
                    }
                } else if (!cookies[cookieName]) {
                    // Tampilkan pop-up jika user_activity tidak ada
                    setShowPopup(true);
                }
            }
        }, 60 * 1000); // 1 menit

        return () => clearInterval(checkPopupInterval); // Membersihkan interval saat komponen di-unmount
    }, []);

    return (
        <div>
            {showPopup && (
                <div className="fixed bottom-0 p-4 md:px-10 z-50 bg-blue-50 border border-gray-300 shadow-lg rounded-lg w-full">
                    <h3 className="text-lg font-semibold">Cookies</h3>
                    <p className="text-sm text-gray-600">
                        Kami menggunakan cookies esensial agar situs web ini dapat berfungsi. 
                        Kami ingin menggunakan cookies lain untuk meningkatkan dan mempersonalisasi 
                        kunjungan Anda, serta menganalisis kinerja situs web kami. Pelajari lebih 
                        lanjut tentang pilihan Anda di Kebijakan Privasi dan Syarat dan Ketentuan.
                    </p>
                    <div className="flex justify-between mt-4">
                        <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                            Tolak Cookies
                        </button>
                        <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Terima Cookies
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityTrackerWithPopup;
