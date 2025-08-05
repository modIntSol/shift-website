
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, LogOut, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { blogService, type BlogPost } from '@/integrations/supabase/blogService';

const AdminDashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Marketing Team',
    published: true
  });
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await blogService.getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingPost) {
        // Update existing post
        await blogService.updatePost(editingPost.id, formData);
        toast({ title: 'Post Updated', description: 'Blog post has been updated successfully' });
        setEditingPost(null);
      } else {
        // Create new post
        await blogService.createPost(formData);
        toast({ title: 'Post Created', description: 'New blog post has been created successfully' });
      }

      // Reload posts
      await loadPosts();

      // Reset form
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: 'Marketing Team',
        published: true
      });
      setShowForm(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save blog post',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      published: post.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await blogService.deletePost(id);
      await loadPosts();
      toast({ title: 'Post Deleted', description: 'Blog post has been deleted successfully' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete blog post',
        variant: 'destructive',
      });
    }
  };

  const togglePublished = async (id: string, currentPublished: boolean) => {
    try {
      await blogService.togglePublished(id, !currentPublished);
      await loadPosts();
      toast({ title: 'Post Updated', description: 'Post visibility has been updated' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post status',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.email}</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Input
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={10}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    disabled={submitting}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex space-x-4">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {editingPost ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      `${editingPost ? 'Update' : 'Create'} Post`
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowForm(false);
                      setEditingPost(null);
                      setFormData({
                        title: '',
                        content: '',
                        excerpt: '',
                        author: 'Marketing Team',
                        published: true
                      });
                    }}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Posts ({posts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No posts created yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePublished(post.id, post.published)}
                          >
                            {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
