import { useState, useEffect, FormEvent } from 'react';
import { type Therapist, insertTherapistSchema } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [editingTherapist, setEditingTherapist] = useState<Partial<Therapist> | null>(null);
  const { toast } = useToast();

  // Check session status on load
  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin));
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password }),
    });
    if (res.ok) {
      setIsAdmin(true);
      toast({ title: 'Login successful' });
    } else {
      toast({ title: 'Login failed', variant: 'destructive' });
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAdmin(false);
    setPassword('');
  };

  // Fetch therapists if logged in
  useEffect(() => {
    if (isAdmin) {
      fetch('/api/admin/therapists')
        .then((res) => res.json())
        .then(setTherapists);
    }
  }, [isAdmin]);

  const handleSaveTherapist = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingTherapist) return;

    const url = editingTherapist.id ? `/api/admin/therapists/${editingTherapist.id}` : '/api/admin/therapists';
    const method = editingTherapist.id ? 'PUT' : 'POST';

    try {
      const parsedData = insertTherapistSchema.partial().parse(editingTherapist);
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      if (res.ok) {
        toast({ title: 'Therapist saved successfully' });
        setEditingTherapist(null);
        // Refresh list
        fetch('/api/admin/therapists').then((res) => res.json()).then(setTherapists);
      } else {
        toast({ title: 'Failed to save therapist', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Invalid data', description: 'Please check the form fields.', variant: 'destructive' });
    }
  };

  const handleDeleteTherapist = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this therapist?')) {
      const res = await fetch(`/api/admin/therapists/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Therapist deleted' });
        setTherapists(therapists.filter((t) => t.id !== id));
      } else {
        toast({ title: 'Failed to delete therapist', variant: 'destructive' });
      }
    }
  };
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingTherapist) return;
    const { name, value } = e.target;
    if (name === 'specialties') {
      setEditingTherapist({ ...editingTherapist, [name]: value.split(',').map(s => s.trim()) });
    } else {
      setEditingTherapist({ ...editingTherapist, [name]: value });
    }
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-4 pt-24">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>

      {editingTherapist && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingTherapist.id ? 'Edit' : 'Add'} Therapist</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveTherapist} className="space-y-4">
              <Input name="name" placeholder="Name" value={editingTherapist.name || ''} onChange={handleEditChange} />
              <Input name="title" placeholder="Title" value={editingTherapist.title || ''} onChange={handleEditChange} />
              <Textarea name="bio" placeholder="Bio" value={editingTherapist.bio || ''} onChange={handleEditChange} />
              <Input name="image" placeholder="Image URL" value={editingTherapist.image || ''} onChange={handleEditChange} />
              <Input name="specialties" placeholder="Specialties (comma-separated)" value={editingTherapist.specialties?.join(', ') || ''} onChange={handleEditChange} />
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button variant="outline" onClick={() => setEditingTherapist(null)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Manage Therapists</CardTitle>
            <Button onClick={() => setEditingTherapist({})}>Add New Therapist</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="flex justify-between items-center p-2 border rounded-md">
                <span>{therapist.name}</span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingTherapist(therapist)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteTherapist(therapist.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 