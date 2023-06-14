

const WorkerProfileFields = () => {

    
    return (
        <>
            <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                <label htmlFor="phoneNumber" className="font-semibold ms-2 ">Numar telefon</label>
                <div className='w-full relative'>
                    <i className="fa-regular fa-edit absolute right-4 top-1"></i>
                    <input type="number" value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    className="bg-white w-full opacity-80 border-b 
                    border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='0712345678'/>
                </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-5/6 short:mt-4">
                <h2 className='font-semibold '
                >
                    Selecteaza serviciile pe care le oferi
                </h2>
                <div className='flex flex-wrap mt-2'>
                    {services && services.map((service) => (
                        <div key={service._id} className='flex mr-1 bg-lime rounded-sm px-2 py-1 mb-2
                            font-semibold text-sm shadow'>  
                            <input type='checkbox' id={`service-${service._id}`}
                                className={`font-semibold mr-1 
                            py-1 rounded-full max-w-fit bg-lime text-sm`} value={service.slug}
                            onClick={handleSelectServices}/>
                            <label htmlFor={`service-${service._id}`}> {service.name} </label>
                        </div>
                            
                    ))}  
                </div>
                </div>  
                        
                {providedServices && providedServices.map((service, idx) => {
                const fieldValue = servicesWithPrice.filter(item => item.service === service)
                
                return (
                    <div key={idx} className='w-5/6'>
                        <label htmlFor={service} className='font-semibold ms-2 text-sm'>Adauga Pret ({service})</label>
                        <input required id={service} type="number" className='bg-white w-full opacity-80 border-b 
                        border-gray text-sm pb-1 py-1 font-semibold pl-2 focus:outline-none' placeholder={`Pretul tau RON / ora - ${service}`}
                        value={fieldValue.length > 0 && fieldValue[0].price}
                        onChange={handleServicePrice} />
                        </div>
                )})}

                <div className="flex flex-col items-start mt-4 w-5/6 ">
                <label htmlFor="description" className="font-semibold ms-2">Descriere</label>
                <div className='w-full relative'>
                    <textarea type="text" value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    className="bg-white w-full opacity-80 border-b 
                    border-lime text-sm pb-1 pl-2 focus:outline-none" placeholder='Scrie ceva despre tine si experienta ta'/>
                    </div>
            </div>  
        </>
    )
}

export default WorkerProfileFields
