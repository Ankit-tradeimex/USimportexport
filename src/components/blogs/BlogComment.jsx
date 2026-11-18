'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, Send, UserRound } from 'lucide-react';

export default function BlogComments({ slug }) {
  const storageKey = `blog-comments-${slug}`;

  const [comments, setComments] = useState([]);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load comments for this particular article
  useEffect(() => {
    try {
      const savedComments = localStorage.getItem(storageKey);

      if (savedComments) {
        const parsed = JSON.parse(savedComments);

        if (Array.isArray(parsed)) {
          setComments(parsed);
        }
      }
    } catch (err) {
      console.error('Unable to load comments:', err);
    }

    setMounted(true);
  }, [storageKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError('');
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setError('Please fill in all the fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (message.length < 3) {
      setError('Your comment must contain at least 3 characters.');
      return;
    }

    if (message.length > 2000) {
      setError('Your comment cannot exceed 2000 characters.');
      return;
    }

    const newComment = {
      id: crypto.randomUUID(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...comments];

    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedComments));

      setComments(updatedComments);

      setForm({
        name: '',
        email: '',
        message: '',
      });

      setError('');
      setSuccess(true);
    } catch (err) {
      console.error('Unable to save comment:', err);
      setError('Unable to save your comment. Please try again.');
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <section className="my-12" id="comments">
      {/* Section heading */}
      <div className="mb-7">
        <div className="mb-2 flex items-center gap-2 text-[#B31942]">
          <MessageCircle size={18} />
          <span className="text-xs font-semibold uppercase tracking-[0.15em]">
            Join the discussion
          </span>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-3xl">
          Comments
          <span className="ml-2 text-lg font-medium text-neutral-400">
            ({mounted ? comments.length : 0})
          </span>
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-slate-400">
          Have something to add? Share your thoughts or ask a question.
        </p>
      </div>

      {/* Comment form */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900/60 sm:p-7">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="comment-name"
                className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-slate-300"
              >
                Your Name <span className="text-[#B31942]">*</span>
              </label>

              <input
                id="comment-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                maxLength={80}
                required
                disabled={!mounted}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#0A3161] focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950 dark:focus:ring-blue-400/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="comment-email"
                className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-slate-300"
              >
                Email Address <span className="text-[#B31942]">*</span>
              </label>

              <input
                id="comment-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={254}
                required
                disabled={!mounted}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#0A3161] focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950 dark:focus:ring-blue-400/10"
              />

              <p className="mt-2 text-xs text-neutral-400 dark:text-slate-500">
                Your email address will not be displayed publicly.
              </p>
            </div>
          </div>

          {/* Comment message */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="comment-message"
                className="text-sm font-semibold text-neutral-700 dark:text-slate-300"
              >
                Your Comment <span className="text-[#B31942]">*</span>
              </label>

              <span className="text-xs text-neutral-400">{form.message.length}/2000</span>
            </div>

            <textarea
              id="comment-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your thoughts here..."
              rows={5}
              maxLength={2000}
              required
              disabled={!mounted}
              className="w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-7 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#0A3161] focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950 dark:focus:ring-blue-400/10"
            />
          </div>

          {/* Feedback */}
          {error && (
            <p role="alert" className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="mt-4 text-sm font-medium text-green-600 dark:text-green-400"
            >
              Your comment has been added successfully!
            </p>
          )}

          {/* Submit */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-400 dark:text-slate-500">
              All fields marked with * are required.
            </p>

            <button
              type="submit"
              disabled={!mounted}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A3161] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#12447e] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Post Comment
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>

      {/* Comments list */}
      <div className="mt-10">
        <h3 className="mb-6 text-lg font-semibold text-neutral-950 dark:text-white">
          Discussion ({mounted ? comments.length : 0})
        </h3>

        {!mounted ? (
          <p className="text-sm text-neutral-400">Loading comments...</p>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 px-5 py-10 text-center dark:border-white/10">
            <MessageCircle
              size={28}
              className="mx-auto mb-3 text-neutral-300 dark:text-slate-600"
            />

            <p className="font-medium text-neutral-700 dark:text-slate-300">No comments yet</p>

            <p className="mt-1 text-sm text-neutral-400 dark:text-slate-500">
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="flex gap-4 border-b border-neutral-100 pb-5 last:border-0 dark:border-white/10"
              >
                {/* Avatar */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0A3161] dark:bg-blue-400/10 dark:text-blue-300">
                  {comment.name ? (
                    <span className="text-sm font-bold">
                      {comment.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <UserRound size={19} />
                  )}
                </div>

                {/* Comment details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {comment.name}
                    </h4>

                    <span className="text-xs text-neutral-400 dark:text-slate-500">
                      {formatDate(comment.date)}
                    </span>
                  </div>

                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-neutral-600 dark:text-slate-400">
                    {comment.message}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
