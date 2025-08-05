import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  blogService,
  type BlogPost,
} from "@/integrations/supabase/blogService";
import { useAuth } from "@/contexts/AuthContext";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const publishedPosts = await blogService.getPublishedPosts();
      setPosts(publishedPosts);
    } catch (err) {
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading blog posts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Marketing Blog</h1>
          {user && (
            <Link to="/admin/dashboard">
              <Button
                variant="outline"
                className="text-blue-400 border-white hover:bg-transparent hover:text-white transition-all duration-300 font-semibold px-6 py-2"
              >
                Admin
              </Button>
            </Link>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Marketing Insights & Updates
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Stay updated with the latest marketing trends, tips, and insights
            from our experts
          </p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <Button
              onClick={loadPosts}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              Try Again
            </Button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">
              No blog posts available yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-white/60 text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">{post.excerpt}</p>
                  <Button
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
