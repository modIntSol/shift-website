import { supabase } from './client';
import type { Database } from './types';

export type BlogPost = Database['public']['Tables']['blogs']['Row'];
export type BlogPostInsert = Database['public']['Tables']['blogs']['Insert'];
export type BlogPostUpdate = Database['public']['Tables']['blogs']['Update'];

export const blogService = {
  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }

    return data || [];
  },

  // Get published blog posts only
  async getPublishedPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching published posts: ${error.message}`);
    }

    return data || [];
  },

  // Get a single blog post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching post: ${error.message}`);
    }

    return data;
  },

  // Create a new blog post
  async createPost(post: BlogPostInsert): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        ...post,
        date: post.date || new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }

    return data;
  },

  // Update a blog post
  async updatePost(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blogs')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }

    return data;
  },

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  },

  // Toggle published status
  async togglePublished(id: string, published: boolean): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blogs')
      .update({
        published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating post status: ${error.message}`);
    }

    return data;
  },
}; 