export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hero_content: {
        Row: {
          id: string
          title: string
          subtitle: string
          stat_1_value: number
          stat_1_label: string
          stat_2_value: number
          stat_2_label: string
          stat_3_value: number
          stat_3_label: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle: string
          stat_1_value: number
          stat_1_label: string
          stat_2_value: number
          stat_2_label: string
          stat_3_value: number
          stat_3_label: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string
          stat_1_value?: number
          stat_1_label?: string
          stat_2_value?: number
          stat_2_label?: string
          stat_3_value?: number
          stat_3_label?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          features: string[]
          gradient: string
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon: string
          features?: string[]
          gradient?: string
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          features?: string[]
          gradient?: string
          order?: number
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          image_url: string
          technologies: string[]
          icon: string
          gradient: string
          link: string | null
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category?: string
          image_url: string
          technologies?: string[]
          icon?: string
          gradient?: string
          link?: string | null
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          image_url?: string
          technologies?: string[]
          icon?: string
          gradient?: string
          link?: string | null
          order?: number
          created_at?: string
        }
      }
      about_content: {
        Row: {
          id: string
          founder_name: string
          founder_title: string
          founder_description: string
          company_description: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_name: string
          founder_title: string
          founder_description: string
          company_description: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_name?: string
          founder_title?: string
          founder_description?: string
          company_description?: string
          updated_at?: string
        }
      }
      contact_info: {
        Row: {
          id: string
          email: string
          phone: string
          address: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone: string
          address: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string
          address?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          industry: string
          icon: string
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          industry: string
          icon?: string
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string
          icon?: string
          order?: number
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          author: string
          role: string
          company: string
          rating: number
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          quote: string
          author: string
          role: string
          company: string
          rating?: number
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          quote?: string
          author?: string
          role?: string
          company?: string
          rating?: number
          order?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
