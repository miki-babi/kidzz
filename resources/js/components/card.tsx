export default function Card(imgsrc, title, price, desc) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-[40px] border border-neutral-100 shadow-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-2 duration-300">
                <div className="h-56 overflow-hidden"><img src={imgsrc} className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" alt={title} /></div>
                <div className="p-8 flex-1 flex flex-col">
                    <h4 className="text-2xl font-bold mb-3">{title}</h4>
                    <p className="text-neutral-500 font-medium mb-8 flex-1 leading-relaxed">{desc}</p>
                    <div className="flex justify-between items-center pt-6 border-t border-neutral-50">
                        <div className="text-left">
                            <span className="text-lg font-black text-neutral-900">${price}</span>
                            <span className="text-xs font-bold text-red-600 block leading-tight">/ {(price * 57).toFixed(0)} ETB</span>
                        </div>
                        <button className="bg-red-600 text-white px-8 py-3 rounded-full font-black shadow-lg shadow-red-100 hover:bg-red-700 transition-colors active:scale-95">Add</button>
                    </div>
                </div>
            </div>

        </div>
    )
}