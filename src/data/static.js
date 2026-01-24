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
    description: 'Implementación de un clúster de Kubernetes altamente disponible en AWS utilizando Terraform para IaC y Ansible para la gestión de configuración. Redujo el tiempo de despliegue en un 40% y optimizó los costes de nube.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT3HLwYFxhR8g39X-LBu30mbfg4rM6lvnYpBDRBI1L36cRhajJPViYRIPllKErfwniQre8P3YFCO5AAKnXI16yeO9mzy4eaNd9CEXAO_RFW7QTryiX4i0bNFD6i0L-A-30nrIa33_mGeKET5v7iE7q9JcwOMO1UYP2HnQAzx_xTFOZWm1y8wB4z2JasFAntI_3QUCHAqEjzgMLWYki5Cd3fWVZoy0bQTcW-jkd79XijbnEWnROxNGvSjz4q6H7KxWVJZGNB8-lsBIG',
    technologies: ['Terraform', 'AWS EKS', 'Ansible', 'GitLab CI'],
    sourceUrl: '#',
    deployUrl: '#'
  }
}

export const getSocialLinks = async () => {
  // En producción: return await fetch('/api/social').then(r => r.json())
  
  return {
    github: 'https://github.com/atxpaul',
    linkedin: 'https://linkedin.com/in/pablo-pan-veira'
    // gitlab: '#',
    // stackoverflow: '#'
  }
}

export const getProfileData = async () => {
  // En producción: return await fetch('/api/profile').then(r => r.json())
  
  return {
    name: 'Pablo Pan DevOps',
    role: '<Cloud Architect /> & <CI/CD Specialist />',
    mission: 'Automatizando lo inautomatizable. Especializado en construir infraestructuras resilientes, pipelines de despliegue ultrarrápidos y arquitectura en la nube escalable.'
  }
}

export const getContactInfo = async () => {
  // En producción: return await fetch('/api/contact').then(r => r.json())
  
  return {
    email: 'dev@root.sh',
    location: 'Remote / Madrid',
    status: 'Open for hire'
  }
}

export const getMetrics = async () => {
  // En producción: return await fetch('/api/metrics').then(r => r.json())
  
  return [
    {
      key: 'uptime',
      value: '99.99%',
      icon: 'check_circle',
      iconColor: 'text-[#0bda5b]',
      statusIcon: 'arrow_upward',
      statusColor: 'text-[#0bda5b]'
    },
    {
      key: 'deployments',
      value: '1,250+',
      icon: 'rocket_launch',
      iconColor: 'text-primary',
      statusIcon: 'add',
      statusColor: 'text-primary'
    },
    {
      key: 'automation',
      value: '85%',
      icon: 'bolt',
      iconColor: 'text-[#fbc02d]',
      statusIcon: 'trending_up',
      statusColor: 'text-[#fbc02d]'
    }
  ]
}

export const getTechStack = async () => {
  // En producción: return await fetch('/api/tech-stack').then(r => r.json())
  
  return {
    core: [
      { name: 'AWS', color: '#ff9900' },
      { name: 'Docker', color: '#0db7ed' },
      { name: 'Kubernetes', color: '#326ce5' },
      { name: 'Terraform', color: '#7b42bc' },
      { name: 'Ansible', color: '#ee0000' }
    ],
    scripting: [
      { name: 'Python', color: '#3776ab' },
      { name: 'Bash', color: '#4EAA25' },
      { name: 'Jenkins', color: '#D24939' },
      { name: 'GitHub Actions', color: '#2088FF' }
    ]
  }
}

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
          'GCP (Compute Engine, GKE)'
        ]
      },
      {
        name: 'Containerization & Orchestration',
        skills: [
          'Docker',
          'Kubernetes',
          'Helm',
          'Docker Compose'
        ]
      },
      {
        name: 'Infrastructure as Code (IaC)',
        skills: [
          'Terraform',
          'Ansible',
          'CloudFormation',
          'Packer'
        ]
      },
      {
        name: 'CI/CD & Automation',
        skills: [
          'Jenkins',
          'GitLab CI/CD',
          'GitHub Actions',
          'ArgoCD',
          'Bash Scripting',
          'Python Scripting'
        ]
      },
      {
        name: 'Monitoring & Logging',
        skills: [
          'Prometheus',
          'Grafana',
          'ELK Stack (Elasticsearch, Logstash, Kibana)',
          'Datadog',
          'Splunk'
        ]
      },
      {
        name: 'Operating Systems & Networking',
        skills: [
          'Linux (Ubuntu, CentOS, RHEL)',
          'Windows Server',
          'TCP/IP',
          'DNS',
          'Firewalling',
          'VPN'
        ]
      },
      {
        name: 'Databases',
        skills: [
          'MySQL',
          'PostgreSQL',
          'MongoDB',
          'Redis'
        ]
      }
    ]
  }
}

