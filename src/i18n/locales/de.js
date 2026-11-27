export default {
    nav: {
        home: 'cd /',
        projects: 'cd /projects',
        about: 'cd /about',
        blog: 'cd /blog',
        cv: 'cat cv.pdf',
        login: './login.sh',
        logout: './logout.sh',
    },
    about: {
        files: 'Profildateien',
        seeProjects: 'Sieh dir meine Projekte an',
        whoami: 'whoami',
        intro: 'DevOps-Ingenieur spezialisiert auf Automatisierung, Cloud und Skalierbarkeit. Ich baue Brücken zwischen Code und Betrieb.',
        description1:
            'Ich bin leidenschaftlich über Infrastructure as Code und Container-Orchestrierung. Mein Ziel ist es, "funktioniert auf meinem Rechner" durch robuste CI/CD-Pipelines zu eliminieren.',
        description2:
            'Mit mehr als 5 Jahren Erfahrung habe ich Bereitstellungszeiten optimiert und die Verfügbarkeit kritischer Systeme in Finanz- und E-Commerce-Umgebungen verbessert.',
        systemMetrics: 'System-Metriken',
        techStack: 'Tech-Stack',
        techStackCategories: {
            core: 'Kern-Abhängigkeiten',
            scripting: 'Skripting & CI/CD',
        },
        metrics: {
            uptime: {
                label: 'Betriebszeit',
                status: 'Stabil',
            },
            deployments: {
                label: 'Bereitstellungen',
                status: 'Dieses Jahr',
            },
            automation: {
                label: 'Automatisierung',
                status: 'Effizienz',
            },
        },
    },
    terminal: {
        prompt: "pablo{'@'}portfolio:~$", // @ escapado: en vue-i18n inicia un mensaje enlazado (@:clave)
        initCommand: './init_system.sh --verbose',
        initOutput: {
            loading: 'Loading kernel modules...',
            mounting: 'Mounting filesystems...',
            connecting: 'Establishing secure connection...',
            done: 'Done',
            connected: 'Connected',
        },
        nameCommand: 'echo $NAME && echo $ROLE',
        name: 'Pablo Pan DevOps',
        role: '<Cloud Architect /> & <CI/CD Specialist />',
        missionCommand: 'cat ./mission_statement.txt',
        mission:
            'Automatisierung des Unautomatisierbaren. Spezialisiert auf den Aufbau widerstandsfähiger Infrastrukturen, ultraschneller Deployment-Pipelines und skalierbarer Cloud-Architektur.',
        status: 'status: ready_to_deploy',
        viewProjects: './view_projects.sh',
        contact: './contact_me.sh',
    },
    projects: {
        openDetail: 'cat project.yml',
        colName: 'Name',
        colStack: 'Stack',
        colModified: 'Geändert',
        results: 'Ergebnisse',
        latestDeployment: 'Latest Deployment',
        subtitleDefault:
            'Lösungen rund um Infrastructure as Code, Container-Orchestrierung und Automatisierungs-Pipelines.',
        searchLabel: 'Projekte nach Name, Beschreibung oder Technologie filtern',
        moreRepositories: 'Weitere Repositories',
        noResults: 'Keine Projekte entsprechen den aktuellen Filtern.',
        clearFilters: 'Filter zurücksetzen',
        empty: 'Noch keine Projekte veröffentlicht.',
        viewCode: 'Code ansehen',
        loadingList: 'Projekte werden geladen...',
        loadingProject: 'Projekt wird geladen...',
        relatedLogs: 'Verwandte Logs',
        notFound: 'Es gibt kein Projekt mit dieser ID. Es wurde möglicherweise umbenannt oder entfernt.',
        loadError: 'Das Projekt konnte nicht geladen werden. Prüfe deine Verbindung und versuche es erneut.',
        filterLabel: 'Nach Technologie filtern',
    },
    common: {
        loading: 'Wird geladen...',
        retry: './retry.sh',
        close: 'Schließen',
    },
    blog: {
        lead: 'Technische Notizen zu Infrastruktur, CI/CD und Cloud-Betrieb.',
        comingSoon: 'Noch keine Beiträge. Technische Artikel sind in Arbeit.',
    },
    notFound: {
        title: 'command not found',
        body: 'Diese Seite existiert nicht. Der Link ist vielleicht veraltet oder fehlerhaft.',
        home: 'cd ~',
        projects: 'cd /projects',
    },
    login: {
        subtitle: 'Mit deinem Google-Konto anmelden',
        cancel: 'Abbrechen',
        google: 'Weiter mit Google',
        loading: 'Anmeldung läuft...',
    },
    header: {
        nav: 'Hauptnavigation',
        language: 'Sprache',
        menu: 'Navigation ein- oder ausblenden',
    },
    footer: {
        social: 'Soziale Profile',
        copyright: '© {year} Pablo Pan Portfolio. Built with Tailwind CSS.',
        localStorageNotice:
            'Wir verwenden den lokalen Speicher, um deine Sprache zu merken.',
        online: 'Online',
        encoding: 'UTF-8',
        locale: 'de_DE',
        branch: 'main',
    },
    social: {
        github: 'GitHub',
        gitlab: 'GitLab',
        stackoverflow: 'StackOverflow',
        linkedin: 'LinkedIn',
    },
    home: {
        summary: 'Profilübersicht',
        fetch: {
            role: 'Rolle',
            location: 'Standort',
            status: 'Status',
            contact: 'Kontakt',
            stack: 'Stack',
        },
    },
};
