import { X } from 'lucide-react';
import { usePortfolio } from '../lib/stores/usePortfolio';

export default function PortfolioOverlay() {
  const { activeSection, closeSection } = usePortfolio();

  if (!activeSection) return null;

  const content = {
    about: {
      title: "About Me",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            Hello! I'm a passionate developer who loves creating immersive digital experiences.
            This interactive portfolio showcases my journey in web development, 3D graphics, and user experience design.
          </p>
          <p>
            I specialize in modern web technologies including React, Three.js, and creative coding.
            When I'm not coding, you can find me exploring new technologies and pushing the boundaries of what's possible on the web.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Creative Coding</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Web Development</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">3D Graphics</span>
          </div>
        </div>
      )
    },
    projects: {
      title: "Featured Projects",
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-lg">Interactive 3D Portfolio</h3>
            <p className="text-gray-600 mb-2">A Three.js powered portfolio with vehicle navigation</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">Three.js</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">TypeScript</span>
            </div>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-lg">WebGL Shader Experiments</h3>
            <p className="text-gray-600 mb-2">Collection of interactive visual effects and animations</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">WebGL</span>
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">GLSL</span>
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">JavaScript</span>
            </div>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-lg">Real-time Data Visualization</h3>
            <p className="text-gray-600 mb-2">Dynamic charts and interactive data exploration tools</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">D3.js</span>
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">WebSocket</span>
            </div>
          </div>
        </div>
      )
    },
    skills: {
      title: "Technical Skills",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 text-lg">Frontend Development</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-900">JavaScript/TypeScript</h4>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-900">React/Next.js</h4>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-medium text-purple-900">Three.js/WebGL</h4>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <h4 className="font-medium text-pink-900">CSS/Tailwind</h4>
                <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{width: '88%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-lg">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['Git', 'Vite', 'Webpack', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    contact: {
      title: "Get In Touch",
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Ready to bring your ideas to life? Let's create something amazing together!
          </p>
          
          <div className="grid gap-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                @
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-gray-600">hello@portfolio.dev</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                💼
              </div>
              <div>
                <h4 className="font-medium">LinkedIn</h4>
                <p className="text-gray-600">linkedin.com/in/portfolio</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                🐙
              </div>
              <div>
                <h4 className="font-medium">GitHub</h4>
                <p className="text-gray-600">github.com/portfolio</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-medium mb-2">Available for:</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Freelance web development projects</li>
              <li>• Creative coding collaborations</li>
              <li>• Full-time opportunities</li>
              <li>• Speaking at conferences and events</li>
            </ul>
          </div>
        </div>
      )
    }
  };

  const sectionData = content[activeSection];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{sectionData.title}</h2>
          <button
            onClick={closeSection}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-6 py-6">
          {sectionData.content}
        </div>
      </div>
    </div>
  );
}
