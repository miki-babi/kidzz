export default function Card(imgsrc, title, price, desc) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col overflow-hidden rounded-[40px] border border-neutral-100 bg-white shadow-xl transition-transform duration-300 hover:-translate-y-2">
                <div className="h-56 overflow-hidden">
                    <img
                        src={imgsrc}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        alt={title}
                    />
                </div>
                <div className="flex flex-1 flex-col p-8">
                    <h4 className="mb-3 text-2xl font-bold">{title}</h4>
                    <p className="mb-8 flex-1 leading-relaxed font-medium text-neutral-500">
                        {desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-neutral-50 pt-6">
                        <div className="text-left">
                            <span className="text-lg font-black text-neutral-900">
                                ${price}
                            </span>
                            <span className="block text-xs leading-tight font-bold text-red-600">
                                / {(price * 57).toFixed(0)} ETB
                            </span>
                        </div>
                        <button className="rounded-full bg-red-600 px-8 py-3 font-black text-white shadow-lg shadow-red-100 transition-colors hover:bg-red-700 active:scale-95">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
