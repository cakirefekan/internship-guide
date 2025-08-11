let activeStepKey = null;
function findFirstIncompleteStep(status, deptSteps) {
    for (const stage of stages) {
        for (const step of deptSteps[stage]) {
            const key = step.key;
            if (!status[stage]?.[key]) {
                return key;
            }
        }
    }
    // Hiç tamamlanmamış madde yoksa ilk maddeyi döndür
    for (const stage of stages) {
        if (deptSteps[stage].length > 0) {
            return deptSteps[stage][0].key;
        }
    }
    return null;
}
const stages = ["pre", "during", "after"];
const processStepsByDept = {
    ceng: {
        pre: [
            {
                key: "sinifDurumu",
                label: "2. Sınıfı Bitir",
                descriptions: [
                    "Öğrenciler ancak ilk iki sınıfı bitirdiği takdirde staj yapabilir.",
                    "Henüz bitirmediyse staj yapamaz."
                ]
            },
            {
                key: "akademikTakvim",
                label: "Akademik Takvimi Kontrol Et",
                descriptions: [
                    "Yaz okulunda ders alacak öğrenciler, yaz okulunda ders aldığı ilgili üniversitenin yaz okulu dönemi bitmeden ve yaz okulu dönemi öncesinde staja başlayamaz, staj yapamaz.",
                    "Yaz okulunda ders almayacak öğrenciler, bir sonraki akademik yılın güz dönemi başlamadan stajlarını bitirmeleri gerekmektedir.",
                    "Staj komitesi tarafından belirlenen başvuru tarihlerinde staj başvurularını yapmaları gerekmektedir.",
                    "Staj komitesinin belirlediği tarihler dışında staj başvurusu kabul edilmemektedir."
                ]
            },
            {
                key: "stajSuresi",
                label: "Staj Süresini Kontrol Et",
                descriptions: [
                    "Staj süresi en az 20 iş günü olmalıdır.",
                    "Öğrenci yapması gereken toplam 2 staj için her koşulda iki farklı başvuru yapmalıdır.",
                    "Resmi tatiller, bayramlar ve üniversitenin tatil günleri staj süresinden sayılmamaktadır.",

                ]
            },
            {
                key: "kurumSecimi",
                label: "Staj Yapılacak Kurumu Belirle",
                descriptions: [
                    "Staj yapılacak kurumun seçimi, öğrencinin kendi sorumluluğundadır.",
                    "Staj yapılacak kurumda en az 1 bilgisayar mühendisi ya da en az 1 yazılım mühendisi çalışıyor olmalıdır.",
                    "Staj yapılacak kurumun, öğrenciye staj süresince rehberlik yapacak bir staj danışmanı ataması gerekmektedir.",
                    "Staj yapılacak kurumun, Staj Komitisedinden onay alacağından emin ol."
                ]
            },
            {
                key: "belgeHazirlama",
                label: "Belgeleri Hazırla",
                descriptions: [
                    "Nüfus cüzdanı fotokopisi",
                    "Adli sicil kaydı (e-devlet üzerinden alınabilir)",
                    "İkametgah belgesi (e-devlet üzerinden alınabilir)",
                    "1 adet vesikalık fotoğraf",
                    "Staj Başvuru Formu", "Yukarıdaki belgeleri yazıcı ile çıktı alarak hazırlayın."]
            },
            {
                key: "basvuruFormu",
                label: "Başvuru Formunu Doldur",
                descriptions: [
                    "Bölümün internet sitesinden yazdırdığınız Staj Başvuru Formunu doldurun ve staj yapılacak firma/kurumun stajyerden sorumlu kurum yetkilisine onaylatın.",
                    "Staj başvuru formunun, stajyerden sorumlu kurum yetkilisi tarafından ıslak imzalı olması ve kaşe/mühür ile damgalanmış olması gerekmektedir.",]
            },
            {
                key: "belgeTeslimi",
                label: "Başvuru Belgelerini Teslim Et",
                descriptions: [
                    "Önceki 2 maddeye göre hazırladığınız fotoğraf, belgeler ve Staj Başvuru Formunu, Staj Komitesine teslim edin.",]
            }
        ],
        during: [
            {
                key: "gunlukRapor",
                label: "Günlük Rapor Yaz",
                descriptions: [
                    "CENG: Her gün yaptığınız işleri raporlayın."
                ]
            },
            {
                key: "gorevTamamlama",
                label: "Görevleri Tamamla",
                descriptions: [
                    "CENG: Size verilen görevleri eksiksiz tamamlayın."
                ]
            }
        ],
        after: [
            {
                key: "raporHazirlama",
                label: "Rapor Hazırla",
                descriptions: [
                    "CENG: Staj sonunda raporunuzu hazırlayın."
                ]
            },
            {
                key: "teslimEtme",
                label: "Raporu Teslim Et",
                descriptions: [
                    "CENG: Raporu ilgili kişiye teslim edin."
                ]
            }
        ]
    },
    eeng: {
        pre: [
            {
                key: "hazirlik",
                label: "Hazırlık Yap",
                descriptions: [
                    "EENG: Ön hazırlıkları tamamlayın."
                ]
            },
            {
                key: "dokuman",
                label: "Dokümanları Hazırla",
                descriptions: [
                    "EENG: Gerekli dokümanları eksiksiz tamamlayın."
                ]
            }
        ],
        during: [
            {
                key: "projeTakip",
                label: "Proje Takip",
                descriptions: [
                    "EENG: Projenizi düzenli takip edin."
                ]
            }
        ],
        after: [
            {
                key: "degerlendirme",
                label: "Değerlendirme Yap",
                descriptions: [
                    "EENG: Staj bitiminde değerlendirmeyi tamamlayın."
                ]
            }
        ]
    },
    temelbilimler: {
        pre: [
            {
                key: "kayitYenileme",
                label: "Kayıt Yenileme",
                descriptions: [
                    "Temel Bilimler: Kayıt işlemlerini tamamlayın."
                ]
            }
        ],
        during: [
            {
                key: "araSinav",
                label: "Ara Sınavlara Hazırlık",
                descriptions: [
                    "Temel Bilimler: Ara sınavlara iyi çalışın."
                ]
            }
        ],
        after: [
            {
                key: "finalSinavi",
                label: "Final Sınavı",
                descriptions: [
                    "Temel Bilimler: Final sınavına hazırlanın."
                ]
            }
        ]
    }
};
document.addEventListener('DOMContentLoaded', function () {
    console.log("Script loaded, DOMContentLoaded event fired");
    console.log("Department cookie:", cookieDispatcher.get("department"));
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            changeHashWithoutScrolling(targetId); // Update URL hash";

        });
    });

    // Highlight active section in navigation
    window.addEventListener('scroll', () => {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) { }
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    });
    // Set the first section as active on page load
    if (sections.length > 0) {
        navLinks[0].classList.add('active');
    }
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-href').substring(1);
            const targetSection = document.querySelector('#guide')
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // URL'nin hash kısmını değiştir
            changeHashWithoutScrolling("guide")

            // Çerezi kaydet
            cookieDispatcher.set('department', targetId, 30);
            // JSON veri
            const deptData = {
                ceng: {
                    pre: "Staj öncesi yapılacaklar...",
                    during: "Staj esnasında yapılacaklar...",
                    after: "Staj sonrası yapılacaklar..."
                }
            };

            // LocalStorage'a kaydet
            localStorageDispatcher.set('process', deptData);

            // Sayfayı yenile
            location.reload();
        });
    });



    function getProcessStatus(deptCode) {
        const allStatus = localStorageDispatcher.get("processStatus") || {};
        return allStatus[deptCode] || { pre: {}, during: {}, after: {} };
    }

    function setProcessStatus(deptCode, status) {
        const allStatus = localStorageDispatcher.get("processStatus") || {};
        allStatus[deptCode] = status;
        localStorageDispatcher.set("processStatus", allStatus);
    }

    function toggleStep(deptCode, stage, stepKey) {
        const status = getProcessStatus(deptCode);
        activeStepKey = findFirstIncompleteStep(status, processStepsByDept[deptCode]);
        if (!status[stage]) status[stage] = {};
        status[stage][stepKey] = !status[stage][stepKey];
        setProcessStatus(deptCode, status);
    }

    function renderChecklist(deptCode, status) {
        const deptSteps = processStepsByDept[deptCode];
        stages.forEach(stage => {
            const container = document.querySelector(`#${stage}-internship ul.checklist-list`);
            if (!container) return;

            container.innerHTML = "";

            deptSteps[stage].forEach(({ key, label, descriptions }) => {
                const li = document.createElement("li");
                const completed = status[stage]?.[key] === true;
                console.log(`Stage: ${stage}, Step: ${key}, Completed: ${completed}`);

                // Başlık
                const liText = document.createElement("span");
                liText.textContent = label;
                li.appendChild(liText);

                // Açıklama paragrafları (başta gizli)
                if (descriptions && Array.isArray(descriptions)) {
                    descriptions.forEach(text => {
                        const p = document.createElement("p");
                        p.textContent = text;
                        p.style.display = "none";
                        p.style.marginTop = "5px";
                        p.style.fontSize = "0.9em";
                        p.style.color = "#555";
                        li.appendChild(p);
                    });
                }

                // İkon span
                const icon = document.createElement("span");
                icon.classList.add("icon");

                if (completed) {
                    li.classList.add("completed");
                    icon.textContent = "🟩";
                } else {
                    li.classList.add("inactive");
                    icon.textContent = "🔳";
                }
                li.prepend(icon);

                // Açıklamaların görünürlüğünü ayarla
                const paragraphs = li.querySelectorAll("p");
                if (completed) {
                    // Tamamlanmış maddelerin açıklamaları her zaman gizli
                    paragraphs.forEach(p => p.style.display = "none");
                } else {
                    // Sadece aktif adımın açıklamaları görünsün
                    if (key === activeStepKey) {
                        paragraphs.forEach(p => p.style.display = "block");
                    } else {
                        paragraphs.forEach(p => p.style.display = "none");
                    }
                }


                if (key === activeStepKey) {
                    li.classList.add("active");
                } else {
                    li.classList.remove("active");
                }
                // Tüm maddeler tıklanabilir ve toggle yapılabilir
                li.style.cursor = "pointer";
                li.addEventListener("click", () => {
                    let status = getProcessStatus(deptCode); // mevcut durum

                    // Önceki adım kontrolü
                    const stepList = deptSteps[stage];
                    const index = stepList.findIndex(s => s.key === key);

                    if (index > 0) {
                        const prevKey = stepList[index - 1].key;
                        if (!status[stage]?.[prevKey]) {
                            alert("Bu adıma geçmeden önce önceki adımı tamamlamalısınız.");
                            return;
                        }
                    }

                    // Toggle yap
                    toggleStep(deptCode, stage, key);

                    // Yeni durumu oku
                    status = getProcessStatus(deptCode);

                    // Aktif adım belirleme
                    if (status[stage]?.[key]) {
                        activeStepKey = findFirstIncompleteStep(status, processStepsByDept[deptCode]);
                    } else {
                        activeStepKey = key;
                    }

                    // Listeyi yeniden çiz
                    renderChecklist(deptCode, status);
                    location.reload()
                });

                container.appendChild(li);
            });
        });
    }

    const deptCode = cookieDispatcher.get("department");
    if (deptCode) {
        const status = getProcessStatus(deptCode);
        activeStepKey = findFirstIncompleteStep(status, processStepsByDept[deptCode]);

        renderChecklist(deptCode, status);
        console.log('Loaded processStatus:', status);

        // Son tamamlanmamış aşamaya göre aktif aşamayı belirle
        const stages = ["pre", "during", "after"];
        let activeStage = "pre"; // default

        for (const stage of stages) {
            const steps = processStepsByDept[deptCode][stage];
            const allCompleted = steps.every(step => status[stage]?.[step.key]);
            if (!allCompleted) {
                activeStage = stage;
                break;
            }
            activeStage = stage;
        }

        // Tüm sekmeleri kapat
        document.querySelectorAll(".guideSection").forEach(section => section.style.display = "none");
        // Tüm tabların gölge stilini kaldır
        const guideTabs = document.querySelectorAll(".guideTabs a");
        guideTabs.forEach(tab => tab.style.boxShadow = "inset 0 -15px 10px -15px black");

        // Aktif tabı bul ve aç
        guideTabs.forEach(tab => {
            const targetId = tab.getAttribute("data-href");
            if (targetId === activeStage + "-internship") {
                tab.style.boxShadow = "inset 0 0 0px #000";
                const targetSection = document.querySelector(`#${targetId}`);
                if (targetSection) targetSection.style.display = "block";

                // Stil ayarları
                const guideContent = document.querySelector('.guideContent');
                guideContent.style.display = "block";
                guideContent.style.color = getComputedStyle(tab).color;
                guideContent.style.backgroundColor = getComputedStyle(tab).backgroundColor;
                guideContent.style.borderColor = getComputedStyle(tab).backgroundColor;
            }
        });
    }

    // cookieDispatcher.delete('department')

    document.querySelector('#guide h2').innerText = cookieDispatcher.get('department') ? cookieDispatcher.get('department') + ' Staj Rehberi' : 'Rehber Kullanımı';
    const guideText = document.querySelector('#guide p').innerText;
    document.querySelector('#guide p').innerText = cookieDispatcher.get('department') ? "" : guideText;
    if (cookieDispatcher.get('department')) {
        const guideContainer = document.querySelector('.guideContainer')
        guideContainer.style.display = "block"

        const targetId = cookieDispatcher.get('department');
        const targetSection = document.querySelector(`#${targetId}`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const guideTabs = document.querySelectorAll(".guideTabs a")
    guideTabs.forEach(tab => {

        tab.addEventListener("click", () => {
            document.querySelectorAll(".guideSection").forEach(section => {
                section.style.display = "none";
            });
            guideTabs.forEach(t => {
                t.style.boxShadow = "inset 0 -15px 10px -15px black"
            });
            tab.style.boxShadow = "inset 0 0 0px #000";
            document.querySelector('.guideContent').style.borderColor = getComputedStyle(tab).backgroundColor;
            document.querySelector('.guideContent').style.display = "block";
            document.querySelector('.guideContent').style.color = getComputedStyle(tab).color;
            document.querySelector('.guideContent').style.backgroundColor = getComputedStyle(tab).backgroundColor;
            document.querySelector('.guideContent').style.borderColor = getComputedStyle(tab).backgroundColor;
            const targetId = tab.getAttribute("data-href");
            const targetSection = document.querySelector(`#${targetId}`);
            if (targetSection) {
                targetSection.style.display = "block";
                document.querySelector('.guideContent').style.borderColor = getComputedStyle(tab).backgroundColor;
            }
        })

    });

    // --- LocalStorage Sıfırlama Butonu Ekle ---
    const guideContainer = document.querySelector('.guideContainer');
    if (guideContainer) {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = "Staj sürecini baştan başlat";
        resetBtn.style.marginBottom = "10px";
        resetBtn.style.padding = "5px 10px";
        resetBtn.style.cursor = "pointer";
        resetBtn.style.backgroundColor = "#d9534f";
        resetBtn.style.color = "white";
        resetBtn.style.border = "none";
        resetBtn.style.borderRadius = "4px";
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem("processStatus");
            localStorage.removeItem("process");
            alert("Süreci baştan takip etmek için sayfa yenileniyor...");
            location.reload();
        });
        guideContainer.prepend(resetBtn);
    } else {
        console.warn("Guide container not found, reset button not added.");
    }



});



function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

const cookieDispatcher = {
    // Çerez oluşturma / güncelleme
    set: function (name, value, days = 7, path = "/") {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
    },

    // Çerezi okuma
    get: function (name) {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        for (let i = 0; i < cookies.length; i++) {
            const [cookieName, cookieValue] = cookies[i].split('=');
            if (decodeURIComponent(cookieName) === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    },

    // Çerezi silme
    delete: function (name, path = "/") {
        this.set(name, '', -1, path);
    }
};
const localStorageDispatcher = {
    // Değer kaydetme / güncelleme
    set: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    // Değer okuma
    get: function (key) {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch {
            return value; // JSON değilse direkt döndür
        }
    },

    // Değer silme
    delete: function (key) {
        localStorage.removeItem(key);
    },

    // Tümünü temizleme
    clear: function () {
        localStorage.clear();
    }
};
function changeHashWithoutScrolling(hash) {
    const id = hash.replace(/^.*#/, '')
    const elem = document.getElementById(id)
    elem.id = `${id}-tmp`;
    window.location.hash = hash
    elem.id = id
}
