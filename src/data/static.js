// Datos estáticos por ahora
// En el futuro, estos datos vendrán de un backend API
// Para cambiar a datos dinámicos, simplemente reemplaza las funciones
// para hacer llamadas fetch/axios a tu API

export const getLatestProject = async () => {
    // Simulación de llamada async (preparado para backend)
    // En producción, aquí harías: return await fetch('/api/projects/latest').then(r => r.json())

    return {
        id: 'terraform-aws-cluster',
        tag: 'terraform-aws-cluster',
        title: 'Kubernetes Auto-Scaler',
        description:
            'Implementación de un clúster de Kubernetes altamente disponible en AWS utilizando Terraform para IaC y Ansible para la gestión de configuración. Redujo el tiempo de despliegue en un 40% y optimizó los costes de nube.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT3HLwYFxhR8g39X-LBu30mbfg4rM6lvnYpBDRBI1L36cRhajJPViYRIPllKErfwniQre8P3YFCO5AAKnXI16yeO9mzy4eaNd9CEXAO_RFW7QTryiX4i0bNFD6i0L-A-30nrIa33_mGeKET5v7iE7q9JcwOMO1UYP2HnQAzx_xTFOZWm1y8wB4z2JasFAntI_3QUCHAqEjzgMLWYki5Cd3fWVZoy0bQTcW-jkd79XijbnEWnROxNGvSjz4q6H7KxWVJZGNB8-lsBIG',
        technologies: ['Terraform', 'AWS EKS', 'Ansible', 'GitLab CI'],
        sourceUrl: '#',
        deployUrl: '#',
    };
};

export const getSocialLinks = async () => {
    // En producción: return await fetch('/api/social').then(r => r.json())

    return {
        github: 'https://github.com/atxpaul',
        linkedin: 'https://linkedin.com/in/pablo-pan-veira',
        // gitlab: '#',
        // stackoverflow: '#'
    };
};

export const getProfileData = async () => {
    // En producción: return await fetch('/api/profile').then(r => r.json())

    return {
        name: 'Pablo Pan DevOps',
        role: '<Cloud Architect /> & <CI/CD Specialist />',
        mission:
            'Automatizando lo inautomatizable. Especializado en construir infraestructuras resilientes, pipelines de despliegue ultrarrápidos y arquitectura en la nube escalable.',
    };
};

export const getContactInfo = async () => {
    // En producción: return await fetch('/api/contact').then(r => r.json())

    return {
        email: 'dev@root.sh',
        location: 'Remote / Salamanca',
        status: 'Open for hire',
    };
};

export const getMetrics = async () => {
    // En producción: return await fetch('/api/metrics').then(r => r.json())

    return [
        {
            key: 'uptime',
            value: '99.99%',
            icon: 'check_circle',
            iconColor: 'text-[#0bda5b]',
            statusIcon: 'arrow_upward',
            statusColor: 'text-[#0bda5b]',
        },
        {
            key: 'deployments',
            value: '1,250+',
            icon: 'rocket_launch',
            iconColor: 'text-primary',
            statusIcon: 'add',
            statusColor: 'text-primary',
        },
        {
            key: 'automation',
            value: '85%',
            icon: 'bolt',
            iconColor: 'text-[#fbc02d]',
            statusIcon: 'trending_up',
            statusColor: 'text-[#fbc02d]',
        },
    ];
};

export const getTechStack = async () => {
    // En producción: return await fetch('/api/tech-stack').then(r => r.json())

    return {
        core: [
            { name: 'AWS', color: '#ff9900' },
            { name: 'Docker', color: '#0db7ed' },
            { name: 'Kubernetes', color: '#326ce5' },
            { name: 'Terraform', color: '#7b42bc' },
            { name: 'Ansible', color: '#ee0000' },
        ],
        scripting: [
            { name: 'Python', color: '#3776ab' },
            { name: 'Bash', color: '#4EAA25' },
            { name: 'Jenkins', color: '#D24939' },
            { name: 'GitHub Actions', color: '#2088FF' },
        ],
    };
};

export const getSkills = async () => {
    // En producción: return await fetch('/api/skills').then(r => r.json())
    // Estructura preparada para mostrarse como JSON en la vista de skills
    return {
        title: 'DevOps Engineer Skills',
        categories: [
            {
                name: 'Cloud Platforms',
                skills: [
                    'AWS (EC2, S3, VPC, Lambda, EKS, CloudFormation)',
                    'Azure (VMs, Azure DevOps, AKS)',
                    'GCP (Compute Engine, GKE)',
                ],
            },
            {
                name: 'Containerization & Orchestration',
                skills: ['Docker', 'Kubernetes', 'Helm', 'Docker Compose'],
            },
            {
                name: 'Infrastructure as Code (IaC)',
                skills: ['Terraform', 'Ansible', 'CloudFormation', 'Packer'],
            },
            {
                name: 'CI/CD & Automation',
                skills: [
                    'Jenkins',
                    'GitLab CI/CD',
                    'GitHub Actions',
                    'ArgoCD',
                    'Bash Scripting',
                    'Python Scripting',
                ],
            },
            {
                name: 'Monitoring & Logging',
                skills: [
                    'Prometheus',
                    'Grafana',
                    'ELK Stack (Elasticsearch, Logstash, Kibana)',
                    'Datadog',
                    'Splunk',
                ],
            },
            {
                name: 'Operating Systems & Networking',
                skills: [
                    'Linux (Ubuntu, CentOS, RHEL)',
                    'Windows Server',
                    'TCP/IP',
                    'DNS',
                    'Firewalling',
                    'VPN',
                ],
            },
            {
                name: 'Databases',
                skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
            },
        ],
    };
};

export const getProjects = async () => {
    // En producción: return await fetch('/api/projects').then(r => r.json())
    // Los proyectos con featured: true se mostrarán como destacados
    // Si hay más de uno con featured: true, se muestra el primero
    
    return [
        {
            id: 'migracion-microservicios',
            title: 'Migración Monolito a Microservicios',
            description: 'Refactorización completa de una arquitectura legacy hacia un cluster de Kubernetes gestionado (GKE). Implementación de Service Mesh con Istio para observabilidad y seguridad mTLS. Reducción de costos operativos del 40%.',
            summary: 'Refactorización completa de una arquitectura legacy de e-commerce.\nSe descompuso el monolito en 12 microservicios independientes,\ndesplegados en un cluster de Kubernetes gestionado (GKE).\nImplementación de Service Mesh con Istio para observabilidad,\ngestión de tráfico y seguridad mTLS entre servicios.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp_hM03NQnUNNCntHXQGks-_2uz10_Jy5g0t59NgVB_LZ95bKvavfEH2VgvWTioihvGYHYzs1Zw2tBAZ7FnTQ3MS7qkDDCDvq14595e-9jBjzBK81UjMIbMVej_8BtFRoPyan1wUacq3WB4nnTK5pgQvlgw8rtD5K4h7Mbyxv7vNo-eAPzr1VDooJ7BzLp4MJnBQ19s7jBqUjDKHI5BuPZh00qxA4lGNEHWlLKDcpyVLZS3UsSRr67ovaeNEIDZ-RYt0ruI91lUgNd',
            technologies: ['Terraform', 'Kubernetes', 'Istio', 'ArgoCD', 'Prometheus'],
            techStack: [
                { name: 'Terraform', icon: 'dns', comment: 'IaC' },
                { name: 'Kubernetes', icon: 'view_in_ar', comment: 'Orchestration' },
                { name: 'Istio', icon: 'security', comment: 'Service Mesh' },
                { name: 'ArgoCD', icon: 'sync_alt', comment: 'GitOps' },
                { name: 'Prometheus', icon: 'monitoring', comment: 'Metrics' }
            ],
            tags: ['kubernetes', 'terraform', 'gcp', 'microservices'],
            status: 'DEPLOYED',
            provider: 'GCP',
            providerFull: 'Google Cloud Platform (GCP)',
            version: '2.4.0',
            github: 'https://github.com/atxpaul/migracion-microservicios',
            architecture: `       +-------------+        +-------------+
       |   Clients   |        |   DevTeam   |
       +------+------+        +------+------+
              | (HTTPS)              | (Git Push)
              v                      v
       +------+------+        +------+------+
       | Cloudflare  |        |   GitHub    |
       +------+------+        +------+------+
              |                      |
       +------+----------------------+------+
       |           GKE Cluster              |
       | +---------+          +-----------+ |
       | | Ingress |<---------| ArgoCD    | |
       | +----+----+          +-----------+ |
       |      |                             |
       |      v (mTLS)                      |
       |  +-------+    +-------+            |
       |  | Svc A |<-->| Svc B |            |
       |  +-------+    +-------+            |
       |      |            |                |
       +------+------------+----------------+
              |            |
         +----+----+  +----+----+
         | CloudSQL|  |  Redis  |
         +---------+  +---------+`,
            featured: true,
            updatedAt: '2024-01-15'
        },
        {
            id: 'cluster-k8s-autoscalable',
            title: 'Cluster K8s Auto-escalable',
            description: 'Orquestación completa en AWS EKS con Karpenter para escalado de nodos ultrarrápido.',
            technologies: ['AWS', 'EKS', 'Python'],
            tags: ['kubernetes', 'aws', 'eks', 'python'],
            icon: 'auto_graph',
            status: 'DEPLOYED',
            github: 'https://github.com/atxpaul/cluster-k8s-autoscalable',
            featured: false,
            updatedAt: '2024-01-20'
        },
        {
            id: 'pipeline-cicd-jenkins',
            title: 'Pipeline CI/CD Jenkins',
            description: 'Automatización de despliegue continuo con análisis estático de código (SonarQube) y notificaciones a Slack.',
            technologies: ['Jenkins', 'Groovy', 'Docker'],
            tags: ['jenkins', 'docker', 'cicd'],
            icon: 'all_inclusive',
            status: 'DEPLOYED',
            github: 'https://github.com/atxpaul/pipeline-cicd-jenkins',
            featured: false,
            updatedAt: '2024-01-13'
        },
        {
            id: 'monitoreo-prometheus',
            title: 'Monitoreo con Prometheus',
            description: 'Stack completo de observabilidad. Dashboards en Grafana para métricas de negocio y alertas en PagerDuty.',
            technologies: ['Grafana', 'Prometheus'],
            tags: ['prometheus', 'grafana', 'monitoring'],
            icon: 'monitoring',
            github: 'https://github.com/atxpaul/monitoreo-prometheus',
            featured: false,
            updatedAt: '2024-01-03'
        },
        {
            id: 'serverless-api-gateway',
            title: 'Serverless API Gateway',
            description: 'Gestión de tráfico sin servidor utilizando AWS API Gateway y funciones Lambda en Node.js.',
            technologies: ['AWS Lambda', 'Node.js'],
            tags: ['aws', 'lambda', 'serverless'],
            icon: 'api',
            github: 'https://github.com/atxpaul/serverless-api-gateway',
            featured: false,
            updatedAt: '2023-12-15'
        },
        {
            id: 'infraestructura-codigo',
            title: 'Infraestructura como Código',
            description: 'Módulos reutilizables de Terraform para despliegue de VPC, RDS y EC2 en múltiples entornos.',
            technologies: ['Terraform', 'HCL'],
            tags: ['terraform', 'iac', 'aws'],
            icon: 'description',
            github: 'https://github.com/atxpaul/infraestructura-codigo',
            featured: false,
            updatedAt: '2023-12-01'
        },
        {
            id: 'vault-secrets-manager',
            title: 'Vault Secrets Manager',
            description: 'Implementación de HashiCorp Vault para gestión centralizada de secretos y rotación automática de claves.',
            technologies: ['Vault', 'Security'],
            tags: ['vault', 'security', 'secrets'],
            icon: 'lock',
            status: 'DEPLOYED',
            github: null, // Sin GitHub para probar que no se muestre el botón
            featured: false,
            updatedAt: '2023-11-15'
        },
        {
            id: 'azure-aks-deployment',
            title: 'Azure AKS Deployment',
            description: 'Despliegue automatizado de clústeres AKS con Terraform y Azure DevOps pipelines.',
            technologies: ['Azure', 'AKS', 'Terraform'],
            tags: ['azure', 'kubernetes', 'terraform'],
            icon: 'cloud',
            github: 'https://github.com/atxpaul/azure-aks-deployment',
            featured: false,
            updatedAt: '2024-01-10'
        }
    ];
};

export const getProjectById = async (id) => {
    // En producción: return await fetch(`/api/projects/${id}`).then(r => r.json())
    const projects = await getProjects()
    return projects.find(p => p.id === id) || null
}

export const getRelatedProjects = async (currentProjectId, limit = 3) => {
    // En producción: return await fetch(`/api/projects/${currentProjectId}/related?limit=${limit}`).then(r => r.json())
    const projects = await getProjects()
    const currentProject = projects.find(p => p.id === currentProjectId)
    
    if (!currentProject) return []
    
    // Filtrar proyectos relacionados por tags o tecnologías similares
    const related = projects
        .filter(p => 
            p.id !== currentProjectId && 
            !p.featured && // Excluir featured
            (p.tags?.some(tag => currentProject.tags?.includes(tag)) ||
             p.technologies?.some(tech => 
                 currentProject.technologies?.some(ct => 
                     ct.toLowerCase().includes(tech.toLowerCase()) || 
                     tech.toLowerCase().includes(ct.toLowerCase())
                 )
             ))
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Más recientes primero
        .slice(0, limit)
    
    return related
}
