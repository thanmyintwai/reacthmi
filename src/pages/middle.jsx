const Middle = () => {
        return (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <iframe
                    src="https://app.propitect.com/" // Replace with your desired URL
                    title="Embedded Page"
                    className="w-[800px] h-[480px] border border-gray-300 shadow-lg"
                  ></iframe>
                </div>
              );
}
 
export default Middle;