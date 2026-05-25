(function () {
  // Page interactions that depend on loaded shared components.
  const galleryItems = {
    "campus-green": {
      title: "Campus Green",
      category: "Outdoor Learning",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=82",
      alt: "University campus building with open green spaces",
      summary: "Modern academic spaces surrounded by open lawns for informal study, movement and student gatherings.",
      details: "The Campus Green connects academic blocks with shaded paths, landscaped lawns and open gathering areas. It is designed as a daily commons where students can pause between classes, meet peers, host small activities and experience the campus as a connected learning environment.",
      highlights: ["Open lawns for student interaction", "Direct access to academic buildings", "Comfortable outdoor study and waiting areas"]
    },
    "research-labs": {
      title: "Research Labs",
      category: "Research & Innovation",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=82",
      alt: "Students working in a laboratory",
      summary: "Hands-on learning spaces with contemporary equipment, collaborative benches and guided research support.",
      details: "The research laboratories support practical learning, faculty-led projects and student experimentation. These spaces help learners move from classroom concepts to applied methods through supervised lab work, demonstrations and collaborative research activities.",
      highlights: ["Practical sessions guided by faculty", "Shared project and experiment zones", "Support for interdisciplinary research work"]
    },
    "central-library": {
      title: "Central Library",
      category: "Academic Resources",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=82",
      alt: "Library reading room with bookshelves",
      summary: "Quiet study zones, journals, books and digital collections for focused academic work.",
      details: "The Central Library serves as a study and reference hub for the university community. It brings together print collections, reading spaces and digital academic resources so students and faculty can work deeply, prepare coursework and support research.",
      highlights: ["Quiet reading and reference spaces", "Print and digital learning resources", "Support for coursework and research preparation"]
    },
    "convocation": {
      title: "Convocation",
      category: "University Life",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=82",
      alt: "Students celebrating graduation",
      summary: "A milestone ceremony celebrating graduates, families, faculty and the university community.",
      details: "Convocation marks the completion of an academic journey and celebrates the achievements of graduating students. The event brings together families, teachers, administrators and alumni to recognize academic effort and welcome graduates into a wider community of service and leadership.",
      highlights: ["Formal recognition of graduating students", "A shared celebration with families and faculty", "Connection to alumni and university traditions"]
    }
  };

  const departmentRecords = [
    { slug: "mathematics", name: "Mathematics", school: "School of Mathematics, Statistics and Computer Science", shortSchool: "Maths, Stat & CS", foundation: "2009", hod: "Prof. Ananya Singh", focus: "pure mathematics, applied modelling, computational methods and mathematical reasoning", courses: ["B.Sc. Mathematics", "M.Sc. Mathematics", "Ph.D. Mathematics"], image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=82" },
    { slug: "statistics", name: "Statistics", school: "School of Mathematics, Statistics and Computer Science", shortSchool: "Maths, Stat & CS", foundation: "2010", hod: "Prof. Raghav Prasad", focus: "data analysis, probability, survey methods, statistical computing and evidence-based decision making", courses: ["B.Sc. Statistics", "M.Sc. Statistics", "Ph.D. Statistics"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=82" },
    { slug: "computer-science", name: "Computer Science", school: "School of Mathematics, Statistics and Computer Science", shortSchool: "Maths, Stat & CS", foundation: "2010", hod: "Dr. Neha Verma", focus: "software systems, algorithms, artificial intelligence, networks and computational problem solving", courses: ["B.Tech / B.Sc. Computer Science", "M.Sc. Computer Science", "Ph.D. Computer Science"], image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=82" },
    { slug: "bioinformatics", name: "Bioinformatics", school: "School of Earth, Biological and Environmental Sciences", shortSchool: "Earth, Bio & EVS", foundation: "2011", hod: "Dr. Kavita Nair", focus: "computational biology, genomics, biological databases and data-led life science research", courses: ["M.Sc. Bioinformatics", "Ph.D. Bioinformatics", "Certificate courses in biological data analysis"], image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=82" },
    { slug: "geology", name: "Geology", school: "School of Earth, Biological and Environmental Sciences", shortSchool: "Earth, Bio & EVS", foundation: "2011", hod: "Prof. Dinesh Oraon", focus: "earth materials, field geology, mineral resources, hazards and regional geological mapping", courses: ["B.Sc. Geology", "M.Sc. Geology", "Ph.D. Geology"], image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82" },
    { slug: "geography", name: "Geography", school: "School of Earth, Biological and Environmental Sciences", shortSchool: "Earth, Bio & EVS", foundation: "2011", hod: "Dr. Farah Khan", focus: "human geography, physical landscapes, GIS, remote sensing and regional planning", courses: ["B.A. / B.Sc. Geography", "M.A. / M.Sc. Geography", "Ph.D. Geography"], image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=82" },
    { slug: "life-science", name: "Life Science", school: "School of Earth, Biological and Environmental Sciences", shortSchool: "Earth, Bio & EVS", foundation: "2012", hod: "Prof. Meera Sinha", focus: "cell biology, ecology, physiology, molecular systems and interdisciplinary biological research", courses: ["B.Sc. Life Science", "M.Sc. Life Science", "Ph.D. Life Science"], image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=82" },
    { slug: "biotechnology", name: "Biotechnology", school: "School of Earth, Biological and Environmental Sciences", shortSchool: "Earth, Bio & EVS", foundation: "2012", hod: "Dr. Pankaj Mishra", focus: "molecular biotechnology, microbiology, bioprocessing, diagnostics and applied biological innovation", courses: ["B.Sc. Biotechnology", "M.Sc. Biotechnology", "Ph.D. Biotechnology"], image: "https://images.unsplash.com/photo-1581093458791-9d42e4dbf090?auto=format&fit=crop&w=1200&q=82" },
    { slug: "environmental-science", name: "Environmental Science", school: "School of Earth, Biological and Environmental Sciences", shortSchool: "Earth, Bio & EVS", foundation: "2012", hod: "Dr. Aditi Ranjan", focus: "environmental monitoring, sustainability, ecology, climate studies and resource management", courses: ["B.Sc. Environmental Science", "M.Sc. Environmental Science", "Ph.D. Environmental Science"], image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=82" },
    { slug: "psychology", name: "Psychology", school: "School of Human Sciences", shortSchool: "Human Science", foundation: "2013", hod: "Prof. Shalini Rao", focus: "cognition, mental health, counselling, social behaviour and human development", courses: ["B.A. Psychology", "M.A. Psychology", "Ph.D. Psychology"], image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1200&q=82" },
    { slug: "historical-studies", name: "Historical Studies", school: "School of Social Sciences and Policy", shortSchool: "Social Sciences & Policies", foundation: "2009", hod: "Prof. Arvind Narayan", focus: "regional history, archival methods, public history, heritage and historical interpretation", courses: ["B.A. Historical Studies", "M.A. Historical Studies", "Ph.D. Historical Studies"], image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=82" },
    { slug: "economics", name: "Economics", school: "School of Social Sciences and Policy", shortSchool: "Social Sciences & Policies", foundation: "2009", hod: "Dr. Nitin Kumar", focus: "development economics, public finance, markets, econometrics and policy analysis", courses: ["B.A. Economics", "M.A. Economics", "Ph.D. Economics"], image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=82" },
    { slug: "development-studies", name: "Development Studies", school: "School of Social Sciences and Policy", shortSchool: "Social Sciences & Policies", foundation: "2010", hod: "Dr. Rashmi Ekka", focus: "livelihoods, public policy, rural transformation, social justice and development practice", courses: ["M.A. Development Studies", "M.Phil. / Research Methods", "Ph.D. Development Studies"], image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=82" },
    { slug: "political-studies", name: "Political Studies", school: "School of Social Sciences and Policy", shortSchool: "Social Sciences & Policies", foundation: "2010", hod: "Prof. S. K. Jha", focus: "political theory, governance, international relations, public institutions and democratic practice", courses: ["B.A. Political Studies", "M.A. Political Studies", "Ph.D. Political Studies"], image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=82" },
    { slug: "sociological-studies", name: "Sociological Studies", school: "School of Social Sciences and Policy", shortSchool: "Social Sciences & Policies", foundation: "2010", hod: "Dr. Manisha Tudu", focus: "social change, community studies, inequality, culture and field-based sociological research", courses: ["B.A. Sociological Studies", "M.A. Sociological Studies", "Ph.D. Sociological Studies"], image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=82" },
    { slug: "library-and-information-science", name: "Library and Information Science", school: "School of Social Sciences and Policy", shortSchool: "Social Sciences & Policies", foundation: "2011", hod: "Dr. Priyanka Das", focus: "knowledge organisation, digital libraries, information literacy and academic resource services", courses: ["B.Lib.I.Sc.", "M.Lib.I.Sc.", "Ph.D. Library and Information Science"], image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=82" },
    { slug: "teacher-education", name: "Teacher Education", school: "School of Education", shortSchool: "School of Education", foundation: "2012", hod: "Prof. Renu Sharma", focus: "teacher preparation, pedagogy, curriculum design, assessment and inclusive classroom practice", courses: ["B.Ed.", "M.Ed.", "Ph.D. Education"], image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=82" },
    { slug: "physical-education", name: "Physical Education", school: "School of Education", shortSchool: "School of Education", foundation: "2013", hod: "Dr. Ajay Lakra", focus: "sports science, fitness, coaching, physical literacy and student wellness", courses: ["B.P.Ed.", "M.P.Ed.", "Ph.D. Physical Education"], image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=82" },
    { slug: "pharmacy", name: "Pharmacy", school: "School of Health Sciences", shortSchool: "Health Science", foundation: "2014", hod: "Dr. Sana Parveen", focus: "pharmaceutical sciences, formulation, pharmacology, quality assurance and healthcare innovation", courses: ["B.Pharm.", "M.Pharm.", "Ph.D. Pharmacy"], image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=82" },
    { slug: "english", name: "English", school: "School of Languages and Literature", shortSchool: "Language & Literature", foundation: "2009", hod: "Prof. Ishita Sen", focus: "literary studies, linguistics, cultural studies, translation and academic communication", courses: ["B.A. English", "M.A. English", "Ph.D. English"], image: "https://images.unsplash.com/photo-1455885666463-9b640e438175?auto=format&fit=crop&w=1200&q=82" },
    { slug: "indian-languages", name: "Indian Languages", school: "School of Languages and Literature", shortSchool: "Language & Literature", foundation: "2011", hod: "Dr. Harish Chandra", focus: "Indian language traditions, translation, comparative literature and regional cultural expression", courses: ["B.A. Indian Languages", "M.A. Indian Languages", "Ph.D. Indian Languages"], image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=82" },
    { slug: "mass-communication", name: "Mass Communication", school: "School of Media, Arts and Aesthetics", shortSchool: "Media, Arts & Aesthetics", foundation: "2012", hod: "Dr. Zoya Ahmed", focus: "journalism, digital media, communication research, audio-visual production and public storytelling", courses: ["B.A. Mass Communication", "M.A. Mass Communication", "Ph.D. Mass Communication"], image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=82" },
    { slug: "agriculture", name: "Agriculture", school: "School of Agriculture", shortSchool: "Agriculture", foundation: "2015", hod: "Dr. Devendra Kumar", focus: "crop science, soil systems, agri-extension, sustainable farming and rural innovation", courses: ["B.Sc. Agriculture", "M.Sc. Agriculture", "Ph.D. Agriculture"], image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1200&q=82" },
    { slug: "commerce-and-business-studies", name: "Commerce and Business Studies", school: "School of Management", shortSchool: "School of Management", foundation: "2012", hod: "Prof. Vivek Menon", focus: "commerce, finance, entrepreneurship, organisational behaviour and business analytics", courses: ["B.Com.", "M.Com. / MBA electives", "Ph.D. Commerce and Business Studies"], image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=82" },
    { slug: "law-and-governance", name: "Law and Governance", school: "School of Law and Governance", shortSchool: "Law & Governance", foundation: "2013", hod: "Prof. Nandita Roy", focus: "constitutional law, governance, public policy, legal research and justice systems", courses: ["B.A. LL.B. / Law Foundation", "LL.M.", "Ph.D. Law and Governance"], image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=82" },
    { slug: "chemistry", name: "Chemistry", school: "School of Physical and Chemical Sciences", shortSchool: "Physical & Chemical", foundation: "2011", hod: "Dr. Mohit Saxena", focus: "organic, inorganic, physical and analytical chemistry with laboratory-led experimentation", courses: ["B.Sc. Chemistry", "M.Sc. Chemistry", "Ph.D. Chemistry"], image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=82" },
    { slug: "physics", name: "Physics", school: "School of Physical and Chemical Sciences", shortSchool: "Physical & Chemical", foundation: "2011", hod: "Prof. K. R. Iyer", focus: "classical and modern physics, materials, electronics, computation and experimental methods", courses: ["B.Sc. Physics", "M.Sc. Physics", "Ph.D. Physics"], image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=82" }
  ];

  const facultyNamePool = [
    "Dr. Ravi Kumar", "Dr. Meenakshi Prasad", "Dr. Nisha Kumari", "Dr. Aman Raj", "Dr. Sushmita Soren", "Dr. Faisal Alam",
    "Dr. Kavya Menon", "Dr. Harpreet Kaur", "Dr. Rajeev Ranjan", "Dr. Pallavi Sinha", "Dr. Arjun Das", "Dr. Leena Toppo",
    "Dr. Mayank Verma", "Dr. Swati Mishra", "Dr. Imran Haque", "Dr. Rituparna Sen", "Dr. Deepak Oraon", "Dr. Shruti Anand"
  ];

  const schoolOrder = Array.from(new Set(departmentRecords.map((department) => department.school)));

  function departmentPageHref(department) {
    return `department-${department.slug}.html`;
  }

  function slugify(value) {
    return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function coursePageHref(department, course) {
    return `course-${department.slug}-${slugify(course)}.html`;
  }

  function hashSlug(slug) {
    return slug.split("").reduce((total, letter) => total + letter.charCodeAt(0), 0);
  }

  function facultyForDepartment(department) {
    const roles = ["Professor & HoD", "Associate Professor", "Assistant Professor", "Assistant Professor", "Assistant Professor", "Academic Coordinator"];
    const start = hashSlug(department.slug) % facultyNamePool.length;
    return roles.map((position, index) => ({
      name: index === 0 ? department.hod : facultyNamePool[(start + index) % facultyNamePool.length],
      position,
      department: department.name,
      contact: `${department.slug}${index ? index + 1 : ""}@cusb.ac.in`,
      photo: `https://i.pravatar.cc/96?img=${((start + index) % 70) + 1}`
    }));
  }

  function memoryImagesForDepartment(department) {
    const images = [
      department.image,
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=900&q=82"
    ];
    return images.map((src, index) => ({
      src,
      alt: `${department.name} department memory ${index + 1}`
    }));
  }

  function closeDropdowns(exceptItem) {
    document.querySelectorAll(".nav-item.is-open").forEach((item) => {
      if (item === exceptItem) return;
      item.classList.remove("is-open");
      item.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
    });
  }

  function initDropdowns() {
    document.querySelectorAll(".nav-trigger").forEach((trigger) => {
      trigger.setAttribute("aria-haspopup", "true");
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const item = trigger.closest(".nav-item");
        if (!item) return;
        const isOpen = !item.classList.contains("is-open");
        closeDropdowns(item);
        item.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-item")) {
        closeDropdowns();
      }
    });
  }

  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#primary-navigation");
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close main navigation" : "Open main navigation");
      if (!isOpen) closeDropdowns();
    }

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener("pointerdown", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    }, { capture: true });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      } else if (event.key === "Escape") {
        closeDropdowns();
      }
    });
  }

  function initStickyNav() {
    const nav = document.querySelector("#primary-navigation");
    if (!nav) return;

    const desktopQuery = window.matchMedia("(min-width: 1101px)");
    const spacer = document.createElement("div");
    spacer.className = "nav-spacer";
    spacer.setAttribute("aria-hidden", "true");
    nav.insertAdjacentElement("afterend", spacer);

    let navTop = 0;

    function measure() {
      nav.classList.remove("is-stuck");
      spacer.classList.remove("is-active");
      spacer.style.height = "0px";
      navTop = nav.getBoundingClientRect().top + window.scrollY;
      spacer.style.height = `${nav.offsetHeight}px`;
    }

    function sync() {
      if (!desktopQuery.matches) {
        nav.classList.remove("is-stuck");
        spacer.classList.remove("is-active");
        return;
      }

      const shouldStick = window.scrollY >= navTop;
      nav.classList.toggle("is-stuck", shouldStick);
      spacer.classList.toggle("is-active", shouldStick);
    }

    measure();
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      sync();
    });
    desktopQuery.addEventListener?.("change", () => {
      measure();
      sync();
    });
  }

  function initStickyMenuToggle() {
    const toggle = document.querySelector(".menu-toggle");
    if (!toggle) return;

    const mobileQuery = window.matchMedia("(max-width: 1100px)");
    let toggleTop = 0;

    function measure() {
      toggle.classList.remove("is-stuck");
      toggleTop = toggle.getBoundingClientRect().top + window.scrollY;
    }

    function sync() {
      if (!mobileQuery.matches) {
        toggle.classList.remove("is-stuck");
        return;
      }

      toggle.classList.toggle("is-stuck", window.scrollY >= toggleTop);
    }

    measure();
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      sync();
    });
    mobileQuery.addEventListener?.("change", () => {
      measure();
      sync();
    });
  }

  function initScrollButtons() {
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.scrollTarget);
        if (!target) return;
        target.scrollBy({
          left: Number(button.dataset.scrollDir || 1) * Math.round(target.clientWidth * .75),
          behavior: "smooth"
        });
      });
    });
  }

  function initBackToTop() {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) return;

    function syncVisibility() {
      button.classList.toggle("is-visible", window.scrollY > 320);
    }

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", syncVisibility, { passive: true });
    syncVisibility();
  }

  function initChatbot() {
    const widget = document.querySelector("[data-chatbot]");
    if (!widget) return;

    const panel = widget.querySelector("[data-chatbot-panel]");
    const toggle = widget.querySelector("[data-chatbot-toggle]");
    const close = widget.querySelector("[data-chatbot-close]");
    const form = widget.querySelector("[data-chatbot-form]");
    const input = widget.querySelector("[data-chatbot-input]");
    const messages = widget.querySelector("[data-chatbot-messages]");
    if (!panel || !toggle || !form || !input || !messages) return;

    const replies = [
      {
        keywords: ["admission", "apply", "application", "program", "course"],
        text: "For admissions, visit the Admissions page for application steps, programs and helpdesk links."
      },
      {
        keywords: ["hostel", "hostels", "room", "accommodation"],
        text: "Hostel information is available on the Hostels page, including student accommodation details."
      },
      {
        keywords: ["result", "results", "semester", "exam", "examination"],
        text: "Semester and examination result links are listed under the Students and Resources sections."
      },
      {
        keywords: ["download", "document", "prospectus", "form"],
        text: "Use Quick Downloads or Prospectus from the footer resources for documents and forms."
      },
      {
        keywords: ["contact", "phone", "email", "support", "helpdesk"],
        text: "For contact details, open Contact Directory or Contact Support from the footer links."
      },
      {
        keywords: ["campus", "facility", "facilities", "library", "medical", "sports"],
        text: "Campus facilities, sports, medical support, smart classrooms and transport pages are available from the site navigation."
      }
    ];

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close chat assistant" : "Open chat assistant");
      if (isOpen) input.focus();
    }

    function addMessage(text, type) {
      const message = document.createElement("div");
      message.className = `chatbot-message ${type}`;
      message.textContent = text;
      messages.appendChild(message);
      messages.scrollTop = messages.scrollHeight;
    }

    function answerQuestion(question) {
      const normalized = question.toLowerCase();
      const match = replies.find((reply) => reply.keywords.some((keyword) => normalized.includes(keyword)));
      return match?.text || "I can help with admissions, hostels, results, downloads, contacts and campus facilities. Try asking about one of those topics.";
    }

    toggle.addEventListener("click", () => setOpen(panel.hidden));
    close?.addEventListener("click", () => {
      setOpen(false);
      toggle.focus();
    });

    widget.querySelectorAll("[data-chatbot-prompt]").forEach((button) => {
      button.addEventListener("click", () => {
        const prompt = button.textContent.trim();
        addMessage(prompt, "user");
        addMessage(answerQuestion(button.dataset.chatbotPrompt || prompt), "bot");
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      input.value = "";
      addMessage(question, "user");
      addMessage(answerQuestion(question), "bot");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function initCampusDirections() {
    const buttons = document.querySelectorAll("[data-campus-directions]");
    if (!buttons.length) return;

    const destination = "Central University of South Bihar, Gaya, Bihar";
    const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;

    function directionsUrl(origin) {
      const originPart = origin ? `origin=${encodeURIComponent(origin)}&` : "";
      return `https://www.google.com/maps/dir/?api=1&${originPart}destination=${encodeURIComponent(destination)}&travelmode=driving`;
    }

    buttons.forEach((button) => {
      button.href = fallbackUrl;
      button.addEventListener("click", (event) => {
        if (!navigator.geolocation) {
          window.alert("Location is not available on this device. Google Maps will open so you can choose your starting location.");
          return;
        }

        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const origin = `${position.coords.latitude},${position.coords.longitude}`;
            window.open(directionsUrl(origin), "_blank", "noopener,noreferrer");
          },
          () => {
            window.alert("Please turn on location access, or choose your starting location manually in Google Maps.");
            window.open(fallbackUrl, "_blank", "noopener,noreferrer");
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });
    });
  }

  function initGallery() {
    const gallery = document.querySelector("[data-gallery]");
    if (!gallery) return;

    const track = gallery.querySelector(".gallery-track");
    const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
    const dots = gallery.querySelector(".gallery-dots");
    const summary = document.querySelector("[data-gallery-summary]");
    const summaryCategory = summary?.querySelector("[data-gallery-summary-category]");
    const summaryTitle = summary?.querySelector("[data-gallery-summary-title]");
    const summaryText = summary?.querySelector("[data-gallery-summary-text]");
    const summaryLink = summary?.querySelector("[data-gallery-summary-link]");
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

    function activate(index, shouldScroll = true) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });
      dots.querySelectorAll("button").forEach((dot, dotIndex) => {
        dot.setAttribute("aria-current", String(dotIndex === activeIndex));
      });
      const activeItem = galleryItems[slides[activeIndex].dataset.galleryId];
      if (activeItem && summary) {
        summaryCategory.textContent = activeItem.category;
        summaryTitle.textContent = activeItem.title;
        summaryText.textContent = activeItem.summary;
        summaryLink.href = `pages/gallery-detail.html?id=${slides[activeIndex].dataset.galleryId}`;
      }
      if (shouldScroll) {
        slides[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }

    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show gallery image ${index + 1}`);
      dot.addEventListener("click", () => activate(index));
      dots.appendChild(dot);
      slide.addEventListener("click", () => activate(index));
    });

    gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => activate(activeIndex - 1));
    gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => activate(activeIndex + 1));
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") activate(activeIndex - 1);
      if (event.key === "ArrowRight") activate(activeIndex + 1);
    });
    activate(activeIndex, false);
  }

  function initGalleryDetailPage() {
    const page = document.querySelector("[data-gallery-detail-page]");
    if (!page) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "research-labs";
    const item = galleryItems[id] || galleryItems["research-labs"];
    const image = page.querySelector("[data-gallery-detail-image]");
    const title = page.querySelector("[data-gallery-detail-title]");
    const category = page.querySelector("[data-gallery-detail-category]");
    const summary = page.querySelector("[data-gallery-detail-summary]");
    const details = page.querySelector("[data-gallery-detail-text]");
    const highlights = page.querySelector("[data-gallery-detail-highlights]");

    document.title = `${item.title} | Gallery | Central University of South Bihar`;
    image.src = item.image;
    image.alt = item.alt;
    title.textContent = item.title;
    category.textContent = item.category;
    summary.textContent = item.summary;
    details.textContent = item.details;
    highlights.innerHTML = "";
    item.highlights.forEach((highlight) => {
      const li = document.createElement("li");
      li.textContent = highlight;
      highlights.appendChild(li);
    });
  }

  function initAcademicsDirectory() {
    const schoolDirectory = document.querySelector("[data-school-directory]");
    if (!schoolDirectory) return;

    schoolDirectory.innerHTML = "";
    schoolOrder.forEach((school) => {
      const departments = departmentRecords.filter((department) => department.school === school);
      const card = document.createElement("article");
      card.className = "school-card";
      card.innerHTML = `
        <h3>${school}</h3>
        <p>${departments.length} department${departments.length === 1 ? "" : "s"} offering teaching, research and student support in this academic domain.</p>
        <div class="department-pills"></div>
      `;
      const pills = card.querySelector(".department-pills");
      departments.forEach((department) => {
        const link = document.createElement("a");
        link.href = departmentPageHref(department);
        link.textContent = department.name;
        pills.appendChild(link);
      });
      schoolDirectory.appendChild(card);
    });
  }

  function initDepartmentPage() {
    const page = document.querySelector("[data-department]");
    if (!page) return;

    const department = departmentRecords.find((item) => item.slug === page.dataset.department);
    if (!department) return;

    document.title = `${department.name} | Departments | Central University of South Bihar`;

    const setText = (selector, text) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    };

    setText("[data-dept-school]", department.school);
    setText("[data-dept-title]", `Department of ${department.name}`);
    setText("[data-dept-summary]", `Academic programs, faculty, research focus and student memories from the Department of ${department.name}.`);
    setText("[data-dept-about]", `The Department of ${department.name} is part of the ${department.school}. Founded in ${department.foundation}, it supports classroom learning, research mentoring, field or laboratory engagement and student development around ${department.focus}.`);
    setText("[data-dept-foundation]", department.foundation);
    setText("[data-dept-hod]", department.hod);

    const image = document.querySelector("[data-dept-image]");
    if (image) {
      image.src = department.image;
      image.alt = `${department.name} department academic environment`;
    }

    const hero = document.querySelector(".page-hero");
    if (hero) {
      hero.style.setProperty("--page-hero-image", `url("${department.image}")`);
    }

    const courses = document.querySelector("[data-dept-courses]");
    if (courses) {
      courses.innerHTML = "";
      department.courses.forEach((course) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = coursePageHref(department, course);
        link.textContent = course;
        li.appendChild(link);
        courses.appendChild(li);
      });
    }

    const facultyBody = document.querySelector("[data-dept-faculty]");
    if (facultyBody) {
      facultyBody.innerHTML = "";
      facultyForDepartment(department).forEach((faculty) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><span class="faculty-person"><img src="${faculty.photo}" alt="${faculty.name}" loading="lazy"><span>${faculty.name}</span></span></td>
          <td>${faculty.position}</td>
          <td>${faculty.department}</td>
          <td><a href="mailto:${faculty.contact}">${faculty.contact}</a></td>
        `;
        facultyBody.appendChild(row);
      });
    }

    const memories = document.querySelector("[data-dept-memories]");
    if (memories) {
      memories.innerHTML = "";
      memoryImagesForDepartment(department).forEach((memory) => {
        const figure = document.createElement("figure");
        figure.className = "memory-tile";
        figure.innerHTML = `<img src="${memory.src}" alt="${memory.alt}" loading="lazy">`;
        memories.appendChild(figure);
      });
    }
  }

  function initSearch() {
    const search = document.querySelector(".site-search");
    if (!search) return;
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = search.querySelector("input");
      const query = input?.value.trim();
      if (!query) return;

      const isNestedPage = window.location.pathname.includes("/pages/");
      const target = isNestedPage ? "sitemap.html" : "pages/sitemap.html";
      window.location.href = `${target}?q=${encodeURIComponent(query)}`;
    });
  }

  function initSitemapSearch() {
    const page = document.querySelector("[data-page='sitemap']");
    if (!page) return;

    const query = new URLSearchParams(window.location.search).get("q")?.trim();
    if (!query) return;

    const normalizedQuery = query.toLowerCase();
    const cards = [...document.querySelectorAll(".sitemap-card, .service-list a")];
    let matches = 0;

    cards.forEach((item) => {
      const isMatch = item.textContent.toLowerCase().includes(normalizedQuery);
      item.hidden = !isMatch;
      if (isMatch) matches += 1;
    });

    const searchSummary = document.createElement("div");
    searchSummary.className = "site-search-results";
    searchSummary.setAttribute("role", "status");
    searchSummary.innerHTML = `<strong>Search results for "${query}"</strong><span>${matches} matching section${matches === 1 ? "" : "s"} found.</span>`;

    const firstSection = document.querySelector(".sitemap-grid")?.closest(".page-section");
    firstSection?.insertAdjacentElement("afterbegin", searchSummary);
  }

  function initAccessibilityTooltips() {
    const buttonSelector = [
      "button",
      ".btn",
      "[role='button']",
      "input[type='button']",
      "input[type='submit']",
      "input[type='reset']"
    ].join(",");

    const tooltip = document.createElement("div");
    tooltip.className = "accessibility-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.hidden = true;
    document.body.appendChild(tooltip);

    let activeElement = null;
    let pointerX = 0;
    let pointerY = 0;

    function cleanText(text) {
      return text?.replace(/\s+/g, " ").trim() || "";
    }

    function visibleText(element) {
      return cleanText(element.innerText || element.textContent);
    }

    function pageNameFromUrl(url) {
      const value = url.split("#")[0].split("?")[0].split("/").filter(Boolean).pop() || "this page";
      return value.replace(/\.html$/i, "").replace(/[-_]+/g, " ");
    }

    function closestTooltipTarget(target) {
      if (!(target instanceof Element)) return null;
      return target.closest(buttonSelector);
    }

    function tooltipText(element) {
      const explicit = cleanText(element.dataset.tooltip || element.getAttribute("aria-label") || element.getAttribute("title"));
      if (explicit) return explicit;

      if (element.matches("a.btn")) {
        const label = visibleText(element) || cleanText(element.getAttribute("href")) || "this link";
        const href = element.getAttribute("href") || "";
        if (href.startsWith("#")) return `Button: ${label}. Jumps to a section on this page.`;
        if (element.target === "_blank") return `Button: ${label}. Opens an external resource in a new tab.`;
        return `Button: ${label}. Opens ${pageNameFromUrl(href)}.`;
      }

      if (element.matches("button, [role='button'], input[type='button'], input[type='submit'], input[type='reset']")) {
        const label = visibleText(element) || cleanText(element.value) || cleanText(element.getAttribute("aria-controls")) || "this control";
        return `Button: ${label}. Activates this action.`;
      }

      return "";
    }

    function positionTooltip(x, y) {
      const gap = 14;
      const rect = tooltip.getBoundingClientRect();
      let left = x + gap;
      let top = y + gap;

      if (left + rect.width > window.innerWidth - 8) left = x - rect.width - gap;
      if (top + rect.height > window.innerHeight - 8) top = y - rect.height - gap;

      tooltip.style.left = `${Math.max(8, left)}px`;
      tooltip.style.top = `${Math.max(8, top)}px`;
    }

    function show(element, x = pointerX, y = pointerY) {
      if (element.closest(".accessibility-tooltip")) return;
      const text = tooltipText(element);
      if (!text) return;

      activeElement = element;
      tooltip.textContent = text;
      tooltip.hidden = false;
      positionTooltip(x, y);
      requestAnimationFrame(() => tooltip.classList.add("is-visible"));
    }

    function hide() {
      activeElement = null;
      tooltip.classList.remove("is-visible");
      window.setTimeout(() => {
        if (!activeElement) tooltip.hidden = true;
      }, 150);
    }

    document.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!activeElement || tooltip.hidden) return;
      positionTooltip(pointerX, pointerY);
    }, { passive: true });

    document.addEventListener("mouseover", (event) => {
      const target = closestTooltipTarget(event.target);
      if (!target || target === activeElement) return;
      show(target, event.clientX, event.clientY);
    });

    document.addEventListener("mouseout", (event) => {
      if (!activeElement) return;
      if (event.relatedTarget && activeElement.contains(event.relatedTarget)) return;
      hide();
    });

    document.addEventListener("focusin", (event) => {
      const target = closestTooltipTarget(event.target);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      show(target, rect.left + Math.min(rect.width / 2, 120), rect.bottom);
    });

    document.addEventListener("focusout", (event) => {
      if (activeElement && activeElement === event.target) hide();
    });
  }

  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  async function boot() {
    if (window.loadSharedComponents) {
      await window.loadSharedComponents();
    }
    initIcons();
    if (window.initTheme) window.initTheme();
    if (window.initAccessibility) window.initAccessibility();
    initMenu();
    initDropdowns();
    initStickyNav();
    initStickyMenuToggle();
    initScrollButtons();
    initBackToTop();
    initChatbot();
    initCampusDirections();
    initGallery();
    initGalleryDetailPage();
    initAcademicsDirectory();
    initDepartmentPage();
    initSearch();
    initSitemapSearch();
    initAccessibilityTooltips();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
