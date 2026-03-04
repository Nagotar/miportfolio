import { supabase } from './client'
import type { Database } from './database.types'

type HeroContent = Database['public']['Tables']['hero_content']['Row']
type Service = Database['public']['Tables']['services']['Row']
type Project = Database['public']['Tables']['projects']['Row']
type AboutContent = Database['public']['Tables']['about_content']['Row']
type ContactInfo = Database["public"]["Tables"]["contact_info"]["Row"]
type Client = Database["public"]["Tables"]["clients"]["Row"]
type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]

export const contentService = {
  // Hero Content
  async getHeroContent(): Promise<HeroContent | null> {
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .single()
    
    if (error) {
      console.error('Error fetching hero content:', error)
      return null
    }
    return data
  },

  async updateHeroContent(content: Partial<HeroContent>): Promise<HeroContent | null> {
    const { data, error } = await supabase
      .from('hero_content')
      .update(content)
      .eq('id', content.id!)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating hero content:', error)
      throw error
    }
    return data
  },

  // Services
  async getServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Error fetching services:', error)
      return []
    }
    return data || []
  },

  async createService(service: Omit<Service, 'id' | 'created_at'>): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating service:', error)
      throw error
    }
    return data
  },

  async updateService(id: string, service: Partial<Service>): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating service:', error)
      throw error
    }
    return data
  },

  async deleteService(id: string): Promise<void> {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting service:', error)
      throw error
    }
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    return data || []
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
    console.log('Intentando crear proyecto con datos:', project)
    
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating project:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      console.error('Project data:', JSON.stringify(project, null, 2))
      throw error
    }
    return data
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating project:', error)
      throw error
    }
    return data
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  },

  // About Content
  async getAboutContent(): Promise<AboutContent | null> {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .single()
    
    if (error) {
      console.error('Error fetching about content:', error)
      return null
    }
    return data
  },

  async updateAboutContent(content: Partial<AboutContent>): Promise<AboutContent | null> {
    const { data, error } = await supabase
      .from('about_content')
      .update(content)
      .eq('id', content.id!)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating about content:', error)
      throw error
    }
    return data
  },

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | null> {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  },

  async updateContactInfo(contactInfo: Database["public"]["Tables"]["contact_info"]["Update"]): Promise<ContactInfo | null> {
    const { data, error } = await supabase
      .from('contact_info')
      .update(contactInfo)
      .eq('id', contactInfo.id!)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Clients
  async getClients(): Promise<Client[]> {
    console.log('Fetching clients from Supabase...')
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Error fetching clients - Full error:', JSON.stringify(error, null, 2))
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      return []
    }
    console.log('Clients fetched successfully:', data?.length || 0, 'clients')
    return data || []
  },

  async createClient(client: Database["public"]["Tables"]["clients"]["Insert"]): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateClient(id: string, client: Database["public"]["Tables"]["clients"]["Update"]): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteClient(id: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    console.log('Fetching testimonials from Supabase...')
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order', { ascending: true })
    
    if (error) {
      console.error('Error fetching testimonials - Full error:', JSON.stringify(error, null, 2))
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      return []
    }
    console.log('Testimonials fetched successfully:', data?.length || 0, 'testimonials')
    return data || []
  },

  async createTestimonial(testimonial: Database["public"]["Tables"]["testimonials"]["Insert"]): Promise<Testimonial | null> {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateTestimonial(id: string, testimonial: Database["public"]["Tables"]["testimonials"]["Update"]): Promise<Testimonial | null> {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteTestimonial(id: string): Promise<void> {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },
}
