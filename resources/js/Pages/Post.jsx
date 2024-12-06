import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const posts = [
    { id: 1, title: "Туризм в Москве", content: "Москва — это не только столица, но и культурная столица страны!", tags: ['Москва', 'Туризм', 'Культура'] },
    { id: 2, title: "История Санкт-Петербурга", content: "Санкт-Петербург — город, где смешиваются история и культура.", tags: ['Санкт-Петербург', 'История', 'Культура'] },
    { id: 3, title: "Казань — жемчужина Поволжья", content: "Казань — город, который сочетает в себе русскую и татарскую культуру.", tags: ['Казань', 'Туризм', 'История'] },
    { id: 4, title: "Горы Кавказа", content: "Природа Кавказа — это незабываемые горы и живописные пейзажи.", tags: ['Горы', 'Природа', 'Туризм'] },
    { id: 5, title: "Красоты Байкала", content: "Байкал — одно из самых красивых озер в мире, с чистейшей водой.", tags: ['Байкал', 'Природа', 'Туризм'] },

];

const tags = ['Москва', 'Санкт-Петербург', 'Казань', 'Горы', 'Байкал', 'Туризм', 'Природа', 'История', 'Культура'];

export default function PostsPage({ auth }) {
    const [selectedTag, setSelectedTag] = useState(null);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });

    const filteredPosts = selectedTag
        ? posts.filter(post => post.tags.includes(selectedTag))
        : posts;

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const handleRemoveTag = () => {
        setSelectedTag(null);
    };

    const handleNewPostChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddNewPost = (e) => {
        e.preventDefault();
        console.log("New post added:", newPost);
        setNewPost({ title: '', content: '', tags: [] });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Посты</h2>}
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="p-6 bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                            <h3 className="mb-4 text-lg font-semibold">Теги</h3>
                            <div className="space-y-2">
                                {tags.map((tag) => (
                                    <button
                                        key={tag}
                                        className={`w-full text-left py-2 px-4 rounded-md ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                                {selectedTag && (
                                    <button
                                        onClick={handleRemoveTag}
                                        className="px-4 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                    >
                                        Сбросить фильтр
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-semibold">Посты</h3>
                                
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post) => (
                                        <div key={post.id} className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700">
                                            <h4 className="text-xl font-semibold">{post.title}</h4>
                                            <p className="mt-2">{post.content}</p>
                                            <div className="mt-4">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-block px-3 py-1 mr-2 text-sm text-white bg-blue-500 rounded-md"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Нет постов для отображения.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 mt-8 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold">Добавить новый пост</h3>

                        <form onSubmit={handleAddNewPost} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Заголовок"
                                    value={newPost.title}
                                    onChange={handleNewPostChange}
                                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="content"
                                    placeholder="Содержание поста"
                                    value={newPost.content}
                                    onChange={handleNewPostChange}
                                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    Добавить пост
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
